import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { createToken } from "../utils/generateToken.js";

// @desc singup user
// @route POST /api/users/signup
// @access Public

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  const token = createToken(user._id);

  res.status(201).json({
    status: "success",
    user,
    token,
  });
});

// @desc login user
// @route POST /api/users/login
// @access Public

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password)))
    throw new Error("Either email or password is incorrect");

  const token = createToken(user._id);

  res.status(200).json({
    status: "success",
    user,
    token,
  });
});

// @desc get user prfile
// @route GET /api/users/profile
// @access private
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: "success",
    user,
  });
});
// @desc update user prfile
// @route PUT /api/users/profile
// @access private
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save({ runValidatorsBeforSave: true });
    const token = createToken(updatedUser._id);
    res.status(200).json({
      status: "success",
      updatedUser,
      token,
    });
  } else throw new Error("User not found");
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    users,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("No user found with this id");
  }

  res.status(204).json({
    status: "success",
  });
});
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("No user found with this id");
  }
  res.status(200).json({
    status: "success",
    user,
  });
});
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("No user found with this id");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin;

  const updatedUser = await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    updatedUser,
  });
});
