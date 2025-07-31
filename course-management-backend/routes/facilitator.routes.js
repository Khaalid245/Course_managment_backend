const express = require("express");
const router = express.Router();
const facilitatorController = require("../controllers/facilitator.controller");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.use(authenticate);

router.post("/", authorizeRoles('manager'), facilitatorController.createFacilitator);
router.get("/", authorizeRoles('manager'), facilitatorController.getAllFacilitators);
router.get("/:id", authorizeRoles('manager'), facilitatorController.getFacilitatorById);
router.put("/:id", authorizeRoles('manager'), facilitatorController.updateFacilitator);
router.delete("/:id", authorizeRoles('manager'), facilitatorController.deleteFacilitator);

module.exports = router;
