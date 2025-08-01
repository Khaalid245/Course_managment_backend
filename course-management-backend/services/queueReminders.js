const { Op } = require("sequelize");
const redisClient = require("../config/redis");
const publishNotification = require("../config/notificationPublisher"); // ✅ IMPORT PUBLISHER
const ActivityTracker = require("../models/activityTracker.model");
const Allocation = require("../models/allocation.model");
const Facilitator = require("../models/facilitator.model");

async function checkAndSendReminders() {
  try {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(today.setDate(weekStart.getDate() + 6));

    const overdueActivities = await ActivityTracker.findAll({
      where: {
        gradingStatus: { [Op.not]: "Done" },
        moderationStatus: { [Op.not]: "Done" },
        createdAt: { [Op.between]: [weekStart, weekEnd] },
      },
      include: [
        {
          model: Allocation,
          include: [{ model: Facilitator }],
        },
      ],
    });

    for (const activity of overdueActivities) {
      const facilitator = activity.Allocation?.Facilitator;
      if (facilitator?.id) {
        await redisClient.rPush("reminderQueue", facilitator.id);
        console.log(`📌 Queued facilitator: ${facilitator.id}`);

        // ✅ Publish notification
        publishNotification({
          type: "reminder",
          message: `Reminder: Facilitator ${facilitator.name} has not completed grading/moderation.`,
        });
      }
    }

    console.log("✅ Overdue facilitators queued + notifications published.");
  } catch (error) {
    console.error("❌ Error queuing reminders:", error);
  }
}

module.exports = checkAndSendReminders;
