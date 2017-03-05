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
    { date: new Date(2016, 1, 30), type: 'email', relationshipId: 1 },
    { date: new Date(2016, 2, 15), type: 'text', relationshipId: 1 },
    { date: new Date(2016, 1, 15), type: 'call', relationshipId: 1 },
    { date: new Date(2016, 1, 23), type: 'face-to-face', relationshipId: 2 },
    { date: new Date(2016, 1, 27), type: 'social', relationshipId: 2 },
    { date: new Date(2016, 3, 4), type: 'email', relationshipId: 2 },
    { date: new Date(2016, 4, 18), type: 'text', relationshipId: 3 },
    { date: new Date(2016, 6, 25), type: 'letter/postcard', relationshipId: 3 },
    { date: new Date(2016, 3, 7), type: 'call', relationshipId: 3 },
], activity => db.model('activity').create(activity));


const seedSpecialDates = () => db.Promise.each([
    { date: new Date(2016, 2, 15), type: 'call', score: 5, relationshipId: 1 },
    { date: new Date(2016, 12, 25), type: 'text', score: 2, relationshipId: 2 },
    { date: new Date(2016, 1, 1), type: 'email', score: 1.5, relationshipId: 3},
], specialDates => db.model('specialDates').create(specialDates));

db.didSync
    .then(() => db.sync({ force: true }))
    .then(seedUser)
    .then(seedRelationship)
    .then(seedActivity)
    .then(seedSpecialDates)
    .catch(error => console.error(error));

