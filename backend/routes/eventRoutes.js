const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/eventController");

router.get("/", ctrl.getEvents);
router.get("/:id", ctrl.getEventById);

module.exports = router;
