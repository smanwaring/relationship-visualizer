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
    values: ['face-to-face', 'call', 'email', 'text', 'social', 'letter/postcard'],
    defaultValue: 'call'
  }
}, {
  getterMethods: {
    score: (days) => {
      const oneDay = 1000 * 60 * 60 * 24;
      const difference = (new Date()).getTime() - this.date.getTime();
      const ageScore = days - difference / oneDay;
      return ageScore * this.type.weight;
    }
  }

});

module.exports = Activity;
