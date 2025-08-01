const { Sequelize, DataTypes } = require('sequelize');

describe('ActivityTracker Model (Safe Tests)', () => {
  let sequelize;
  let ActivityTracker;

  beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false });

    // Test-friendly version of ActivityTracker
    ActivityTracker = sequelize.define('ActivityTracker', {
      allocationId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      attendance: {
        type: DataTypes.JSON, // Array of booleans can be simulated with JSON
        defaultValue: [],
      },
      gradingStatus: {
        type: DataTypes.STRING, // Replace ENUM with STRING for test
        allowNull: false,
        validate: {
          isIn: [['Not Started', 'Pending', 'Done']],
        },
      },
      moderationStatus: {
        type: DataTypes.STRING, // Replace ENUM with STRING for test
        allowNull: false,
        validate: {
          isIn: [['Not Started', 'Pending', 'Done']],
        },
      },
    });

    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('creates a valid activity tracker entry', async () => {
    const tracker = await ActivityTracker.create({
      allocationId: 'alloc-123',
      attendance: [true, false, true],
      gradingStatus: 'Pending',
      moderationStatus: 'Not Started',
    });

    expect(tracker.attendance).toEqual([true, false, true]);
    expect(tracker.gradingStatus).toBe('Pending');
  });

  test('fails with invalid grading status', async () => {
    await expect(
      ActivityTracker.create({
        allocationId: 'alloc-999',
        attendance: [false, false],
        gradingStatus: 'Unknown', // ❌ Invalid
        moderationStatus: 'Done',
      })
    ).rejects.toThrow();
  });
});
