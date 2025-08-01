const Redis = require("ioredis");

const subscriber = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});

// ✅ Define the function
function subscribeToNotifications() {
  subscriber.subscribe("activity-updated", (err, count) => {
    if (err) {
      console.error("❌ Failed to subscribe:", err);
    } else {
      console.log(`📬 Subscribed to ${count} channel(s).`);
    }
  });

  subscriber.on("message", (channel, message) => {
    console.log(`📨 Message received on ${channel}:`, message);
   
  });
}


module.exports = subscribeToNotifications;
