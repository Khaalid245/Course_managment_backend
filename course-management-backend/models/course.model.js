// models/course.model.js
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    half: {
      type: DataTypes.ENUM('H1', 'H2'),
      allowNull: false
    }
  });
  return Course;
};
