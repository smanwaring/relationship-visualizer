const db = require('../../db');

const seedUser = () => db.Promise.each([
    { name: 'Phillip Manwaring', email: 'phil@example.com' }
], user => db.model('user').create(user));

const seedRelationship = () => db.Promise.each([
    { name: 'Mom', score: 10, type: 'family', userId: 1 },
    { name: 'Andrew', score: 5, type: 'friend', userId: 1  },
    { name: 'Niz', score: 2, type: 'friend', userId: 1  },
], relationship => db.model('relationship').create(relationship));


const seedActivity = () => db.Promise.each([
    { date: Date.UTC(2016, 1, 30, 8, 30), type: 'call', score: 5, relationshipId: 1 },
    { date: Date.UTC(2016, 2, 15, 9, 30), type: 'text', score: 2, relationshipId: 1 },
    { date: Date.UTC(2016, 1, 15, 8, 40), type: 'email', score: 1.5, relationshipId: 1 },
    { date: Date.UTC(2016, 1, 23, 9, 45), type: 'call', score: 3, relationshipId: 2 },
    { date: Date.UTC(2016, 1, 27, 14, 30), type: 'text', score: 5, relationshipId: 2 },
    { date: Date.UTC(2016, 3, 4, 8, 10), type: 'email', score: 3.5, relationshipId: 2 },
    { date: Date.UTC(2016, 4, 18, 15, 50), type: 'call', score: 8, relationshipId: 3 },
    { date: Date.UTC(2016, 6, 25, 11, 30), type: 'text', score: 1, relationshipId: 3 },
    { date: Date.UTC(2016, 3, 7, 8, 40), type: 'email', score: 5, relationshipId: 3 },


], activity => db.model('activity').create(activity));


const seedSpecialDates = () => db.Promise.each([
    { date: Date.UTC(2016, 2, 15), type: 'call', score: 5, relationshipId: 1 },
    { date: Date.UTC(2016, 12, 25), type: 'text', score: 2, relationshipId: 2 },
    { date: Date.UTC(2016, 1, 1), type: 'email', score: 1.5, relationshipId: 3},
], specialDates => db.model('specialDates').create(specialDates));

db.didSync
    .then(() => db.sync({ force:true }))
    .then(seedUser)
    .then(results => console.log('Seeded the users!!!!'))
    .then(seedRelationship)
    .then(seedActivity)
    .then(seedSpecialDates)
    .catch(error => console.error(error));

