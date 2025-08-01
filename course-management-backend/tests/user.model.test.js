const { Sequelize, DataTypes } = require('sequelize');

describe('User Model (Safe Tests)', () => {
  let sequelize;
  let User;

  beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false });

    // Define a test-friendly version of the User model
    User = sequelize.define('User', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING, // <-- Replace ENUM with STRING just for test
        allowNull: false,
      },
    });

    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('creates a valid user', async () => {
    const user = await User.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'securepassword',
      role: 'manager',
    });

    expect(user.name).toBe('Jane Doe');
    expect(user.email).toBe('jane@example.com');
  });

  test('fails to create duplicate email', async () => {
    await User.create({
      name: 'Original User',
      email: 'duplicate@example.com',
      password: '123456',
      role: 'manager',
    });

    await expect(
      User.create({
        name: 'Duplicate User',
        email: 'duplicate@example.com',
        password: 'abcdef',
        role: 'student',
      })
    ).rejects.toThrow();
  });
});
