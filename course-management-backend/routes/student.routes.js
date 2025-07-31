const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.use(authenticate);

router.post("/", authorizeRoles('manager'), studentController.createStudent);
router.get("/", authorizeRoles('manager'), studentController.getAllStudents);
router.get("/:id", authorizeRoles('manager'), studentController.getStudentById);
router.put("/:id", authorizeRoles('manager'), studentController.updateStudent);
router.delete("/:id", authorizeRoles('manager'), studentController.deleteStudent);

module.exports = router;
