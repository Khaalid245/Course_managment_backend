const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ActivityTracker = sequelize.define('ActivityTracker', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    allocationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    attendance: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    gradingStatus: {
      type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
      defaultValue: 'Not Started',
    },
    moderationStatus: {
      type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
      defaultValue: 'Not Started',
    },
  });

  return ActivityTracker;
};
