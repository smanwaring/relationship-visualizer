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
    type: Sequelize.ENUM,
    values: ['In Person', 'Call', 'Email', 'Text', 'Social', 'Wrote Letter'],
    defaultValue: 'Call'
  }
}, {
  instanceMethods: {
    ageScore: function(days) {
      const oneDay = 1000 * 60 * 60 * 24;
      const difference = (new Date().getTime() - this.date.getTime());
      const ageScore = days - difference / oneDay;
      return ageScore < 0 ? 0 : ageScore;
    }
  }
});

module.exports = Activity;
