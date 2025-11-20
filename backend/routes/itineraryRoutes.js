const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/itineraryController");
const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, ctrl.addItinerary);
router.get("/user/:userId", verifyToken, ctrl.getItinerariesByUser);
router.delete("/:id", verifyToken, ctrl.deleteItinerary);

module.exports = router;
