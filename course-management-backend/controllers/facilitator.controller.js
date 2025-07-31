const db = require("../models");
const Facilitator = db.Facilitator;

// Helper: Get facilitator by ID only if owned by manager
const findFacilitatorById = async (id, managerId) => {
  return await Facilitator.findOne({ where: { id, managerId } });
};

exports.createFacilitator = async (req, res) => {
  try {
    const managerId = req.user.id;

    const newFacilitator = await Facilitator.create({
      ...req.body,
      managerId
    });

    res.status(201).json(newFacilitator);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create facilitator",
      error: err.message
    });
  }
};

exports.getAllFacilitators = async (req, res) => {
  try {
    const managerId = req.user.id;

    const facilitators = await Facilitator.findAll({
      where: { managerId }
    });

    res.status(200).json(facilitators);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch facilitators",
      error: err.message
    });
  }
};

exports.getFacilitatorById = async (req, res) => {
  try {
    const facilitator = await findFacilitatorById(req.params.id, req.user.id);

    if (!facilitator) {
      return res.status(404).json({ message: "Facilitator not found or unauthorized" });
    }

    res.status(200).json(facilitator);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get facilitator",
      error: err.message
    });
  }
};

exports.updateFacilitator = async (req, res) => {
  try {
    const facilitator = await findFacilitatorById(req.params.id, req.user.id);

    if (!facilitator) {
      return res.status(404).json({ message: "Facilitator not found or unauthorized" });
    }

    await facilitator.update(req.body);

    res.status(200).json(facilitator);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update facilitator",
      error: err.message
    });
  }
};

exports.deleteFacilitator = async (req, res) => {
  try {
    const facilitator = await findFacilitatorById(req.params.id, req.user.id);

    if (!facilitator) {
      return res.status(404).json({ message: "Facilitator not found or unauthorized" });
    }

    await facilitator.destroy();

    res.status(200).json({ message: "Facilitator deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete facilitator",
      error: err.message
    });
  }
};
