const { Op } = require("sequelize");
const redisClient = require("../config/redis");
const ActivityTracker = require("../models/activityTracker.model");
const Allocation = require("../models/allocation.model");
const Facilitator = require("../models/facilitator.model");

async function checkAndSendReminders() {
  try {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday
    const weekEnd = new Date(today.setDate(weekStart.getDate() + 6)); // Saturday

    const overdueActivities = await ActivityTracker.findAll({
      where: {
        gradingStatus: { [Op.not]: "Done" },
        moderationStatus: { [Op.not]: "Done" },
        createdAt: {
          [Op.between]: [weekStart, weekEnd],
        },
      },
      include: [
        {
          model: Allocation,
          include: [{ model: Facilitator }],
        },
      ],
    });

    for (const activity of overdueActivities) {
      const facilitatorId = activity.Allocation?.Facilitator?.id;
      if (facilitatorId) {
        await redisClient.rPush("reminderQueue", facilitatorId);
        console.log(`📌 Queued facilitator: ${facilitatorId}`);
      }
    }

    console.log("✅ Overdue facilitators queued successfully.");
  } catch (error) {
    console.error("❌ Error queuing reminders:", error);
  }
}

module.exports = checkAndSendReminders;
