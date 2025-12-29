import express from "express";
import {  registerUser, loginUser, getMe, updateProfile } from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser); 
router.post("/login", loginUser);
router.get("/me", verifyToken, getMe);
router.put("/update-profile", verifyToken, updateProfile);

export default router;
