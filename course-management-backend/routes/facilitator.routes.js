const express = require("express");
const router = express.Router();
const facilitatorController = require("../controllers/facilitator.controller");

router.post("/", facilitatorController.createFacilitator);
router.get("/", facilitatorController.getAllFacilitators);
router.get("/:id", facilitatorController.getFacilitatorById);
router.put("/:id", facilitatorController.updateFacilitator);
router.delete("/:id", facilitatorController.deleteFacilitator);

module.exports = router;
