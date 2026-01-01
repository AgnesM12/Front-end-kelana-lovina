import express from "express";
import { addTiket, getMyTiket, getDetailTiket } from "../controllers/tiketController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, addTiket);       
router.get("/user", verifyToken, getMyTiket); 
router.get("/:id", verifyToken, getDetailTiket); 
export default router;
