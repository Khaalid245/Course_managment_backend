// models/allocation.model.js
module.exports = (sequelize, DataTypes) => {
  const Allocation = sequelize.define('Allocation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    trimester: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Allocation;
};
