const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const db = require("./models"); 
const i18n = require('./config/i18n'); 

dotenv.config();

const app = express();


app.use(i18n.init); 
app.use(express.json());
app.use(express.static('public')); 


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
const publishNotification = require('./config/notificationPublisher');
const testRoutes = require("./routes/test.routes"); // 

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");


const checkAndSendReminders = require('./services/queueReminders');
setInterval(checkAndSendReminders, 1000 * 60 * 60 * 6); // every 6 hours






app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/modes", modeRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/facilitators", facilitatorRoutes);
app.use("/api/allocations", allocationRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/activity-trackers", activityTrackerRoutes);
app.use("/api", testRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.get('/api/greet', (req, res) => {
  const lang = req.query.lang || 'en';
  res.setLocale(lang);
  res.send(res.__('greeting')); 
});


sequelize.sync({ force: false, alter: false })
  .then(() => {
    console.log("✅ Database synced successfully");

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);

      
      subscribeToNotifications();
    });
  })
  .catch((err) => console.error("❌ DB Sync Error:", err));
