import express from "express";
import { savePayment, midtransNotification } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/midtrans", savePayment);
router.post("/midtrans/notification", midtransNotification);

export default router;