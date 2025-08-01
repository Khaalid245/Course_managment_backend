/**
 * @swagger
 * tags:
 *   name: ActivityTracker
 *   description: Facilitator activity tracking
 */

const express = require('express');
const router = express.Router();
const db = require('../models');
const ActivityTracker = db.ActivityTracker;
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /activity-tracker:
 *   post:
 *     summary: Create activity tracker
 *     tags: [ActivityTracker]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivityTracker'
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Server error
 */
router.post('/', authenticate, authorizeRoles('facilitator'), async (req, res) => {
  try {
    const tracker = await ActivityTracker.create(req.body);
    res.status(201).json(tracker);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create activity tracker', error: err.message });
  }
});

/**
 * @swagger
 * /activity-tracker:
 *   get:
 *     summary: Get all activity trackers (manager only)
 *     tags: [ActivityTracker]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of trackers
 *       500:
 *         description: Server error
 */
router.get('/', authenticate, authorizeRoles('manager'), async (req, res) => {
  try {
    const trackers = await ActivityTracker.findAll();
    res.json(trackers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trackers', error: err.message });
  }
});

/**
 * @swagger
 * /activity-tracker/{id}:
 *   get:
 *     summary: Get one activity tracker
 *     tags: [ActivityTracker]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tracker found
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authenticate, authorizeRoles('manager', 'facilitator'), async (req, res) => {
  try {
    const tracker = await ActivityTracker.findByPk(req.params.id);
    if (!tracker) return res.status(404).json({ message: 'Not found' });
    res.json(tracker);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tracker', error: err.message });
  }
});

/**
 * @swagger
 * /activity-tracker/{id}:
 *   put:
 *     summary: Update activity tracker (facilitator only)
 *     tags: [ActivityTracker]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivityTracker'
 *     responses:
 *       200:
 *         description: Updated
 *       500:
 *         description: Update failed
 */
router.put('/:id', authenticate, authorizeRoles('facilitator'), async (req, res) => {
  try {
    const updated = await ActivityTracker.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Updated', data: updated });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

/**
 * @swagger
 * /activity-tracker/{id}:
 *   delete:
 *     summary: Delete activity tracker (manager only)
 *     tags: [ActivityTracker]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 *       500:
 *         description: Delete failed
 */
router.delete('/:id', authenticate, authorizeRoles('manager'), async (req, res) => {
  try {
    await ActivityTracker.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});

module.exports = router;
