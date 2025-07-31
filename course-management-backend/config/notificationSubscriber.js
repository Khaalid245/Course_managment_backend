const redis = require('../config/redis');

const subscribeToNotifications = () => {
  const sub = redis.duplicate();

  sub.subscribe("activity-updated", () => {
    console.log("🔔 Subscribed to activity-updated channel");
  });

  sub.on("message", (channel, message) => {
    const data = JSON.parse(message);
    console.log(`📬 Notification received [${channel}]:`, data.message);
  });
};

module.exports = subscribeToNotifications;
