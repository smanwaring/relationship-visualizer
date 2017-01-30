const Sequelize = require('sequelize');
const db = require('../db');

const Activity = db.define('activity', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
   score: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
});

module.exports = Activity;
