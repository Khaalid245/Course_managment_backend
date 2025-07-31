const express = require("express");
const router = express.Router();
const modeController = require("../controllers/mode.controller");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.use(authenticate);

router.get("/", modeController.getAllModes); // All authenticated users
router.post("/", authorizeRoles('manager'), modeController.createMode); // Manager only

module.exports = router;
