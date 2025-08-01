// testPublisher.js
const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});

redis.publish("activity-updated", JSON.stringify({ message: "✅ Hello from the publisher!" }))
  .then(() => {
    console.log("📤 Test notification published");
    redis.quit();
  });
