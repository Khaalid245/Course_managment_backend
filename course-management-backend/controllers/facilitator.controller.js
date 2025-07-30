const db = require("../models");
const Facilitator = db.Facilitator;

exports.createFacilitator = async (req, res) => {
  try {
    const newFacilitator = await Facilitator.create(req.body);
    res.status(201).json(newFacilitator);
  } catch (err) {
    res.status(500).json({ message: "Failed to create facilitator", error: err.message });
  }
};

exports.getAllFacilitators = async (req, res) => {
  try {
    const facilitators = await Facilitator.findAll();
    res.status(200).json(facilitators);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch facilitators", error: err.message });
  }
};

exports.getFacilitatorById = async (req, res) => {
  try {
    const facilitator = await Facilitator.findByPk(req.params.id);
    if (!facilitator) return res.status(404).json({ message: "Facilitator not found" });
    res.status(200).json(facilitator);
  } catch (err) {
    res.status(500).json({ message: "Failed to get facilitator", error: err.message });
  }
};

exports.updateFacilitator = async (req, res) => {
  try {
    const [updated] = await Facilitator.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ message: "Facilitator not found" });

    const updatedFacilitator = await Facilitator.findByPk(req.params.id);
    res.status(200).json(updatedFacilitator);
  } catch (err) {
    res.status(500).json({ message: "Failed to update facilitator", error: err.message });
  }
};

exports.deleteFacilitator = async (req, res) => {
  try {
    const deleted = await Facilitator.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Facilitator not found" });

    res.status(200).json({ message: "Facilitator deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete facilitator", error: err.message });
  }
};
