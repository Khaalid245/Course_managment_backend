const db = require("../models");
const Allocation = db.Allocation;

exports.createAllocation = async (req, res) => {
  try {
    const allocation = await Allocation.create(req.body);
    res.status(201).json(allocation);
  } catch (err) {
    res.status(500).json({ message: "Failed to create allocation", error: err.message });
  }
};

exports.getAllAllocations = async (req, res) => {
  try {
    const allocations = await Allocation.findAll({
      include: [db.Course, db.ClassModel, db.Facilitator, db.Mode],
    });
    res.status(200).json(allocations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch allocations", error: err.message });
  }
};

exports.getAllocationById = async (req, res) => {
  try {
    const allocation = await Allocation.findByPk(req.params.id, {
      include: [db.Course, db.ClassModel, db.Facilitator, db.Mode],
    });
    if (!allocation) return res.status(404).json({ message: "Allocation not found" });
    res.status(200).json(allocation);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving allocation", error: err.message });
  }
};

exports.updateAllocation = async (req, res) => {
  try {
    const [updated] = await Allocation.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Allocation not found" });
    const updatedAllocation = await Allocation.findByPk(req.params.id);
    res.status(200).json(updatedAllocation);
  } catch (err) {
    res.status(500).json({ message: "Failed to update allocation", error: err.message });
  }
};

exports.deleteAllocation = async (req, res) => {
  try {
    const deleted = await Allocation.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Allocation not found" });
    res.status(200).json({ message: "Allocation deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete allocation", error: err.message });
  }
};
