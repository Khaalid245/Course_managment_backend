// models/student.model.js
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cohortId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Student;
};
