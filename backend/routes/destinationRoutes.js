const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/destinationController");

router.get("/", ctrl.getDestinations);
router.get("/:id", ctrl.getDestinationById);

module.exports = router;
