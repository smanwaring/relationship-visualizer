const db = require('../../db');

const seedUser = () => db.Promise.each([
    { name: 'Phillip Manwaring', email: 'phil@example.com' }
], user => db.model('user').create(user));

const seedRelationship = () => db.Promise.each([
    { name: 'Mom', type: 'family', userId: 1 },
    { name: 'Andrew', type: 'friend', userId: 1  },
    { name: 'Niz', type: 'friend', userId: 1  },
], relationship => db.model('relationship').create(relationship));

const seedActivity = () => db.Promise.each([
    { date: new Date(2017, 1, 28), type: 'Email', relationshipId: 1 },
    { date: new Date(2017, 2, 1), type: 'Text', relationshipId: 1 },
    { date: new Date(2017, 1, 27), type: 'Call', relationshipId: 1 },
    { date: new Date(2017, 1, 27), type: 'In Person', relationshipId: 2 },
    { date: new Date(2017, 1, 20), type: 'Social', relationshipId: 2 },
    { date: new Date(2017, 2, 4), type: 'Email', relationshipId: 2 },
    { date: new Date(2017, 2, 6), type: 'Text', relationshipId: 3 },
    { date: new Date(2017, 2, 5), type: 'Wrote Letter', relationshipId: 3 },
    { date: new Date(2017, 2, 4), type: 'Call', relationshipId: 3 },
], activity => db.model('activity').create(activity));


const seedSpecialDates = () => db.Promise.each([
    { date: new Date(2016, 2, 15), type: 'Call', score: 5, relationshipId: 1 },
    { date: new Date(2016, 12, 25), type: 'Text', score: 2, relationshipId: 2 },
    { date: new Date(2016, 1, 1), type: 'Email', score: 1.5, relationshipId: 3},
], specialDates => db.model('specialDates').create(specialDates));

db.didSync
    .then(() => db.sync({ force: true }))
    .then(seedUser)
    .then(seedRelationship)
    .then(seedActivity)
    .then(seedSpecialDates)
    .catch(error => console.error(error));

