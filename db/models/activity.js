const Sequelize = require('sequelize');
const db = require('../db');

const Activity = db.define('activity', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  getterMethods: {
    score: (days) => {
      const difference = (new Date()).getTime() - this.date.getTime();
      const ageScore = days - difference / (1000 * 60 * 60 * 24);
      return ageScore * this.type.weight;
    }
  }

});

module.exports = Activity;
