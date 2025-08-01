// models/course.model.js
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    half: {
      type: DataTypes.ENUM('H1', 'H2'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['H1', 'H2']],
          msg: 'Half must be either H1 or H2'
        }
      }
    }
  });

  return Course;
};
