import express from "express";
import {
  login,
  getProfile,
  signup,
  updateProfile,
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
} from "../controller/userController.js";
import { isAdmin, proctect } from "../controller/authController.js";

const router = express.Router();

router.route("/").get(proctect, isAdmin, getAllUsers);
router.post("/signup", signup);
router.post("/login", login);
router.route("/profile").get(proctect, getProfile).put(proctect, updateProfile);
router
  .route("/:id")
  .put(proctect, isAdmin, updateUser)
  .delete(proctect, isAdmin, deleteUser)
  .get(proctect, isAdmin, getUser);

export default router;
