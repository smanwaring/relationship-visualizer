const Sequelize = require('sequelize');
const db = require('../db');

const ActivityType = db.define('activityType', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  weight: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = ActivityType;

