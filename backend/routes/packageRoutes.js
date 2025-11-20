const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/packageController");

router.get("/", ctrl.getPackages);
router.get("/:id", ctrl.getPackageById);

module.exports = router;
