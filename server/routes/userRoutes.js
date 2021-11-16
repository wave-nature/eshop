import express from "express";
import { login, getProfile, signup } from "../controller/userController.js";
import { proctect } from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.route("/profile").get(proctect, getProfile);

export default router;
