const express = require("express");
const router = express.Router();
const classController = require("../controllers/class.controller");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.use(authenticate);

router.post("/", authorizeRoles('manager'), classController.createClass);
router.get("/", classController.getAllClasses);
router.get("/:id", classController.getClassById);
router.put("/:id", authorizeRoles('manager'), classController.updateClass);
router.delete("/:id", authorizeRoles('manager'), classController.deleteClass);

module.exports = router;
