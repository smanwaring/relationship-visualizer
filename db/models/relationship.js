const Sequelize = require('sequelize');
const db = require('../db');

const Relationship = db.define('relationship', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  score: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true
    }
  },
   type: {
    type: Sequelize.ENUM,
    values: ['family', 'friend', 'professional', 'other'],
    defaultValue: 'family'
  },
  color: Sequelize.STRING
});

module.exports = Relationship;
