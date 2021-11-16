import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const proctect = asyncHandler(async (req, res, next) => {
  let token;
  //token exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) throw new Error("Please login to get access!");

  //verify token
  try {
    const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // find loggedin user
    const loggedInUser = await User.findById(payload.id);
    req.user = loggedInUser;
  } catch (error) {
    throw new Error("invalid token, please login again");
  }

  //check if token expires or password changed after token assigns
  next();
});
