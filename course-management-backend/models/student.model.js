module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cohortId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Student;
};
