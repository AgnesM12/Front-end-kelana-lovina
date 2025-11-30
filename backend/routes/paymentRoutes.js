const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/paymentController");
const { verifyToken } = require("../middleware/auth");

router.get("/:orderId", verifyToken, ctrl.getPaymentInfo);
router.put("/confirm/:orderId", verifyToken, ctrl.confirmPayment);

module.exports = router;
