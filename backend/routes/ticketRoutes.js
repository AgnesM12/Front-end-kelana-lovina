const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/ticketController");
const { verifyToken } = require("../middleware/auth");

router.get("/:orderId", verifyToken, ctrl.getTicketByOrder);

module.exports = router;
