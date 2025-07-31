// models/mode.model.js
module.exports = (sequelize, DataTypes) => {
  const Mode = sequelize.define('Mode', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.ENUM('online', 'in-person', 'hybrid'),
      allowNull: false
    }
  });

  return Mode;
};
