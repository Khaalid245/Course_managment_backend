const { Manager } = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.createManager = async (req, res) => {
  try {
    const { name } = req.body;
    const newManager = await Manager.create({ id: uuidv4(), name });
    res.status(201).json(newManager);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create manager', error: error.message });
  }
};

exports.getManagers = async (req, res) => {
  try {
    const managers = await Manager.findAll();
    res.json(managers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch managers', error: error.message });
  }
};
