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
   type: {
    type: Sequelize.ENUM,
    values: ['family', 'friend', 'professional', 'other'],
    defaultValue: 'family'
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '#2196f3',
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Relationship;
