const sequelize = require("../config/database");
const { DataTypes } = require('sequelize');

// Model Imports
const Manager = require('./manager.model')(sequelize, DataTypes);
const Course = require('./course.model')(sequelize, DataTypes);
const Cohort = require('./cohort.model')(sequelize, DataTypes);
const ClassModel = require('./class.model')(sequelize, DataTypes);
const Student = require('./student.model')(sequelize, DataTypes);
const Facilitator = require('./facilitator.model')(sequelize, DataTypes);
const Mode = require('./mode.model')(sequelize, DataTypes);
const Allocation = require('./allocation.model')(sequelize, DataTypes);
const ActivityTracker = require('./activityTracker.model')(sequelize, DataTypes);

// ------------------------
// Model Relationships
// ------------------------

// Facilitator <-> Manager
Facilitator.belongsTo(Manager, { foreignKey: "managerId" });
Manager.hasMany(Facilitator, { foreignKey: "managerId" });

// Student <-> ClassModel
Student.belongsTo(ClassModel, { foreignKey: "classId" });
ClassModel.hasMany(Student, { foreignKey: "classId" });

// Student <-> Cohort
Student.belongsTo(Cohort, { foreignKey: "cohortId" });
Cohort.hasMany(Student, { foreignKey: "cohortId" });

// Allocation <-> Course
Allocation.belongsTo(Course, { foreignKey: "courseId" });
Course.hasMany(Allocation, { foreignKey: "courseId" });

// Allocation <-> ClassModel
Allocation.belongsTo(ClassModel, { foreignKey: "classId" });
ClassModel.hasMany(Allocation, { foreignKey: "classId" });

// Allocation <-> Facilitator
Allocation.belongsTo(Facilitator, { foreignKey: "facilitatorId" });
Facilitator.hasMany(Allocation, { foreignKey: "facilitatorId" });

// Allocation <-> Mode
Allocation.belongsTo(Mode, { foreignKey: "modeId" });
Mode.hasMany(Allocation, { foreignKey: "modeId" });

// ActivityTracker <-> Allocation
ActivityTracker.belongsTo(Allocation, { foreignKey: "allocationId" });
Allocation.hasOne(ActivityTracker, { foreignKey: "allocationId" });

// ------------------------
// Export db object
// ------------------------

const db = {};

db.sequelize = sequelize;
db.Manager = Manager;
db.Course = Course;
db.Cohort = Cohort;
db.ClassModel = ClassModel;
db.Student = Student;
db.Facilitator = Facilitator;
db.Mode = Mode;
db.Allocation = Allocation;
db.ActivityTracker = ActivityTracker;

module.exports = db;
