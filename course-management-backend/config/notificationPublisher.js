// config/notificationPublisher.js
const redis = require('./redis');

function publishNotification(data) {
  redis.publish("activity-updated", JSON.stringify(data));
}

module.exports = publishNotification;
