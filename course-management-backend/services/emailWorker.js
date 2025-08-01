const Redis = require("ioredis");
const transporter = require("../config/email");
const Facilitator = require("../models/facilitator.model");
require("dotenv").config();

// Create a dedicated Redis subscriber
const subscriber = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});

subscriber.subscribe("activity-updated", (err, count) => {
  if (err) {
    console.error("❌ Redis subscription error:", err);
  } else {
    console.log("📨 Subscribed to 'activity-updated' channel.");
  }
});

subscriber.on("message", async (channel, message) => {
  try {
    const data = JSON.parse(message);

    if (data.type === "reminder") {
      const nameMatch = data.message.match(/Facilitator (.+?) has/);
      const facilitatorName = nameMatch ? nameMatch[1] : null;

      if (facilitatorName) {
        const facilitator = await Facilitator.findOne({ where: { name: facilitatorName } });
        if (facilitator && facilitator.email) {
          await transporter.sendMail({
            from: `"Academic System" <${process.env.EMAIL_USER}>`,
            to: facilitator.email,
            subject: "Reminder: Incomplete Grading/Moderation",
            text: data.message,
          });
          console.log(`✅ Email sent to ${facilitator.email}`);
        } else {
          console.log("⚠️ Facilitator email not found.");
        }
      }
    }
  } catch (error) {
    console.error("❌ Error in email worker:", error);
  }
});
