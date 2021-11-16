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
