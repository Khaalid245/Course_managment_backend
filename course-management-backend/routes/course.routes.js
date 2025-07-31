const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.use(authenticate);

router.post("/", authorizeRoles('manager'), courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.put("/:id", authorizeRoles('manager'), courseController.updateCourse);
router.delete("/:id", authorizeRoles('manager'), courseController.deleteCourse);

module.exports = router;
