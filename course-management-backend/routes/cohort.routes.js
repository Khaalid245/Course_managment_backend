const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const db = require("../models");
const Cohort = db.Cohort;

router.use(authenticate);

// Get all cohorts
router.get("/", async (req, res) => {
  try {
    const cohorts = await Cohort.findAll();
    res.json(cohorts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cohorts", error: err.message });
  }
});

// Optional: Get cohort by ID
router.get("/:id", async (req, res) => {
  try {
    const cohort = await Cohort.findByPk(req.params.id);
    if (!cohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }
    res.json(cohort);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cohort", error: err.message });
  }
});

module.exports = router;
