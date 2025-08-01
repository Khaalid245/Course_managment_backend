const db = require("../models");
const ActivityTracker = db.ActivityTracker;
const publishNotification = require("../config/notificationPublisher"); 

exports.createActivityTracker = async (req, res) => {
  try {
    const { allocationId, attendance, gradingStatus, moderationStatus } = req.body;

    const newTracker = await ActivityTracker.create({
      allocationId,
      attendance,
      gradingStatus,
      moderationStatus,
    });

    res.status(201).json(newTracker);
  } catch (error) {
    res.status(500).json({ message: "Failed to create activity tracker", error: error.message });
  }
};

exports.getAllActivityTrackers = async (req, res) => {
  try {
    const trackers = await ActivityTracker.findAll();
    res.status(200).json(trackers);
  } catch (error) {
    res.status(500).json({ message: "Failed to get activity trackers", error: error.message });
  }
};

exports.getActivityTrackerById = async (req, res) => {
  try {
    const { id } = req.params;
    const tracker = await ActivityTracker.findByPk(id);
    if (!tracker) return res.status(404).json({ message: "Activity Tracker not found" });
    res.status(200).json(tracker);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tracker", error: error.message });
  }
};

exports.updateActivityTracker = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await ActivityTracker.update(req.body, { where: { id } });

    if (!updated) return res.status(404).json({ message: "Activity Tracker not found" });

    const updatedTracker = await ActivityTracker.findByPk(id);

    // ✅ Publish notification to Redis
    await publishNotification({
      type: "activity-update",
      activityTrackerId: id,
      message: `Activity Tracker ID ${id} was updated.`,
      timestamp: new Date().toISOString()
    });

    res.status(200).json(updatedTracker);
  } catch (error) {
    res.status(500).json({ message: "Failed to update tracker", error: error.message });
  }
};

exports.deleteActivityTracker = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ActivityTracker.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: "Activity Tracker not found" });

    res.status(200).json({ message: "Activity Tracker deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete tracker", error: error.message });
  }
};
