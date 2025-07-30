const express = require("express");
const router = express.Router();
const modeController = require("../controllers/mode.controller");

router.get("/", modeController.getAllModes);     // ✅ this is a function
router.post("/", modeController.createMode);     // ✅ add this for seeding

module.exports = router;
