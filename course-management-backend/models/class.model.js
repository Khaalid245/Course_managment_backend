// models/class.model.js
module.exports = (sequelize, DataTypes) => {
  const ClassModel = sequelize.define('ClassModel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    graduationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cohortId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return ClassModel;
};
