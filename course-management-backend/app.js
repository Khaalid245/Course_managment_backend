const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const db = require("./models"); // auto-load models and relations
const i18n = require('./config/i18n'); // i18n setup

// Load environment variables
dotenv.config();

const app = express();

// 🧩 Middleware
app.use(i18n.init); // 🟢 Enable i18n first
app.use(express.json());
app.use(express.static('public')); // 🟢 Serve static files (HTML/CSS)

// 📦 API Routes
const authRoutes = require('./routes/auth.routes');
const courseRoutes = require("./routes/course.routes");
const classRoutes = require("./routes/class.routes");
const modeRoutes = require("./routes/mode.routes");
const studentRoutes = require("./routes/student.routes");
const facilitatorRoutes = require("./routes/facilitator.routes");
const allocationRoutes = require("./routes/allocation.routes");
const managerRoutes = require('./routes/manager.routes');
const activityTrackerRoutes = require('./routes/activityTracker.routes');
const subscribeToNotifications = require('./config/notificationSubscriber');
const checkAndSendReminders = require('./services/queueReminders');
setInterval(checkAndSendReminders, 1000 * 60 * 60 * 6); // every 6 hours





// 🧭 Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/modes", modeRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/facilitators", facilitatorRoutes);
app.use("/api/allocations", allocationRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/activity-trackers", activityTrackerRoutes);

// 🌐 Translation test endpoint
app.get('/api/greet', (req, res) => {
  const lang = req.query.lang || 'en';
  res.setLocale(lang);
  res.send(res.__('greeting')); // Translated response
});

// 🗄️ Sync DB and Start Server
sequelize.sync({ force: false, alter: false })
  .then(() => {
    console.log("✅ Database synced successfully");

    // Start server
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);

      // 🟢 Start Redis subscription after server starts
      subscribeToNotifications();
    });
  })
  .catch((err) => console.error("❌ DB Sync Error:", err));
