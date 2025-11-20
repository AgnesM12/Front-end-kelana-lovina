const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/orderController");
const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, ctrl.createOrder);
router.get("/:id", verifyToken, ctrl.getOrderById);
router.get("/user/:userId", verifyToken, ctrl.getOrdersByUser);

module.exports = router;
