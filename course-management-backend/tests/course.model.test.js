// tests/course.model.test.js
const { Sequelize, DataTypes, ValidationError } = require('sequelize');
const CourseModel = require('../models/course.model');

let sequelize;
let Course;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false }); // In-memory DB for testing
  Course = CourseModel(sequelize, DataTypes);
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe('Course Model', () => {
  test('should create a course', async () => {
    const course = await Course.create({ name: 'Backend Engineering', half: 'H1' });

    expect(course).toBeDefined();
    expect(course.name).toBe('Backend Engineering');
    expect(course.half).toBe('H1');
  });

  test('should fail if name is missing', async () => {
    expect.assertions(1);
    try {
      await Course.create({ half: 'H2' });
    } catch (err) {
      expect(err).toBeInstanceOf(ValidationError);
    }
  });

  test('should fail if half is invalid', async () => {
    expect.assertions(1);
    try {
      await Course.create({ name: 'DevOps', half: 'H3' });
    } catch (err) {
      expect(err).toBeInstanceOf(ValidationError); // Corrected for SQLite behavior
    }
  });
});
