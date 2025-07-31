module.exports = (sequelize, DataTypes) => {
  const Facilitator = sequelize.define('Facilitator', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qualification: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    managerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users', // 👈 Make sure it matches the User table name
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'Facilitators', // 👈 Force correct table name (case sensitive in MySQL)
    timestamps: false,
  });

  return Facilitator;
};
