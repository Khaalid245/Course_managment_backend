module.exports = (sequelize, DataTypes) => {
  const Facilitator = sequelize.define('Facilitator', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qualification: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    managerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Managers', // Table name (must match DB)
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  });

  return Facilitator;
};
