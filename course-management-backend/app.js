const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const db = require("./models"); // auto-load models and relations

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// ✅ Only the route we’ve built so far
const courseRoutes = require("./routes/course.routes");
app.use("/api/courses", courseRoutes);

const classRoutes = require("./routes/class.routes");
app.use("/api/classes", classRoutes);

const modeRoutes = require("./routes/mode.routes");
app.use("/api/modes", modeRoutes);


const studentRoutes = require("./routes/student.routes");
app.use("/api/students", studentRoutes);

const facilitatorRoutes = require("./routes/facilitator.routes");
app.use("/api/facilitators", facilitatorRoutes);

const allocationRoutes = require("./routes/allocation.routes");
app.use("/api/allocations", allocationRoutes);

const managerRoutes = require('./routes/manager.routes');
app.use('/api/managers', managerRoutes);

const activityTrackerRoutes = require('./routes/activityTracker.routes');
app.use('/api/activity-trackers', activityTrackerRoutes);



// Root Test Route
app.get("/", (req, res) => res.send("🎓 Course Management Backend is running!"));

// Sync DB and Start Server
sequelize.sync({ alter: true })  // ⚠️ switch to alter: true later
  .then(() => {
    console.log("✅ Database synced successfully");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("❌ DB Sync Error:", err));
