const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const db = require("../models");
const Cohort = db.Cohort;

router.use(authenticate);

/**
 * @swagger
 * /cohorts:
 *   get:
 *     tags: [Cohorts]
 *     summary: Get all cohorts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all cohorts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cohort'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const cohorts = await Cohort.findAll();
    res.json(cohorts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cohorts", error: err.message });
  }
});

/**
 * @swagger
 * /cohorts/{id}:
 *   get:
 *     tags: [Cohorts]
 *     summary: Get cohort by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cohort ID
 *     responses:
 *       200:
 *         description: Cohort details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cohort'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cohort not found
 *       500:
 *         description: Internal server error
 */
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