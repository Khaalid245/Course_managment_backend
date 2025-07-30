const db = require("../models");
const Mode = db.Mode;

exports.getAllModes = async (req, res) => {
  try {
    const modes = await Mode.findAll();
    res.status(200).json(modes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch modes", error: err.message });
  }
};

exports.createMode = async (req, res) => {
  try {
    const mode = await Mode.create(req.body);
    res.status(201).json(mode);
  } catch (err) {
    res.status(500).json({ message: "Failed to create mode", error: err.message });
  }
};
