const express = require('express');
const router = express.Router();
const db = require('../models');
const ActivityTracker = db.ActivityTracker;

// Create
router.post('/', async (req, res) => {
  try {
    const tracker = await ActivityTracker.create(req.body);
    res.status(201).json(tracker);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create activity tracker', error: err.message });
  }
});

// Get all
router.get('/', async (req, res) => {
  try {
    const trackers = await ActivityTracker.findAll();
    res.json(trackers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trackers', error: err.message });
  }
});

// Get one
router.get('/:id', async (req, res) => {
  try {
    const tracker = await ActivityTracker.findByPk(req.params.id);
    if (!tracker) return res.status(404).json({ message: 'Not found' });
    res.json(tracker);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tracker', error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updated = await ActivityTracker.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Updated', data: updated });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await ActivityTracker.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});

module.exports = router;
