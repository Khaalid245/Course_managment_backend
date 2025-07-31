const express = require("express");
const router = express.Router();
const allocationController = require("../controllers/allocation.controller");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.use(authenticate);

router.post("/", authorizeRoles('manager'), allocationController.createAllocation);
router.get("/", authorizeRoles('manager'), allocationController.getAllAllocations);
router.get("/:id", authorizeRoles('manager'), allocationController.getAllocationById);
router.put("/:id", authorizeRoles('manager'), allocationController.updateAllocation);
router.delete("/:id", authorizeRoles('manager'), allocationController.deleteAllocation);

module.exports = router;
