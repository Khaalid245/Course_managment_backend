const express = require("express");
const router = express.Router();
const publishNotification = require("../config/notificationPublisher");

router.post("/test-notification", (req, res) => {
  const { facilitatorName, message } = req.body;

  publishNotification({
    type: "reminder",
    message: `Facilitator ${facilitatorName} has ${message}`,
  });

  res.status(200).json({ status: "Notification sent" });
});

module.exports = router;
