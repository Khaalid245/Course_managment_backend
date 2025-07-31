// models/allocation.model.js
module.exports = (sequelize, DataTypes) => {
  const Allocation = sequelize.define('Allocation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    facilitatorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    modeId: {
      type: DataTypes.INTEGER, // ✅ FIXED from UUID to INTEGER
      allowNull: false,
    },
    trimester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Allocation;
};
