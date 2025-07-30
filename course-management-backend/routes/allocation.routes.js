const express = require("express");
const router = express.Router();
const allocationController = require("../controllers/allocation.controller");

router.post("/", allocationController.createAllocation);
router.get("/", allocationController.getAllAllocations);
router.get("/:id", allocationController.getAllocationById);
router.put("/:id", allocationController.updateAllocation);
router.delete("/:id", allocationController.deleteAllocation);

module.exports = router;
