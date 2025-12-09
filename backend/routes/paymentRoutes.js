import express from "express";
import { savePayment } from "../controllers/paymentController.js";

const router = express.Router();

// POST: Simpan payment dari FE
router.post("/", savePayment);

export default router;
