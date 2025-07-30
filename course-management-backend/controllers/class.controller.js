const db = require("../models");
const Class = db.ClassModel;

exports.createClass = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ message: "Failed to create class", error: err.message });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch classes", error: err.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const foundClass = await Class.findByPk(req.params.id);
    if (!foundClass) return res.status(404).json({ message: "Class not found" });
    res.status(200).json(foundClass);
  } catch (err) {
    res.status(500).json({ message: "Failed to get class", error: err.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const [updated] = await Class.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Class not found" });
    const updatedClass = await Class.findByPk(req.params.id);
    res.status(200).json(updatedClass);
  } catch (err) {
    res.status(500).json({ message: "Failed to update class", error: err.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const deleted = await Class.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Class not found" });
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete class", error: err.message });
  }
};
