const Sequelize = require('sequelize');
const db = require('../db');

const SpecialDates = db.define('specialDates', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = SpecialDates;
