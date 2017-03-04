const db = require('../../db');

const seedUser = () => db.Promise.each([
    { name: 'Phillip Manwaring', email: 'phil@example.com' }
], user => db.model('user').create(user));

const seedRelationship = () => db.Promise.each([
    { name: 'Mom', type: 'family', userId: 1 },
    { name: 'Andrew', type: 'friend', userId: 1  },
    { name: 'Niz', type: 'friend', userId: 1  },
], relationship => db.model('relationship').create(relationship));

const seedActivityType = () => db.Promise.each([
    { name: 'In person meeting', weight: 1.0, id: 1 },
    { name: 'Phone call', weight: 0.8, id: 2 },
    { name: 'Text, email, letter', weight: 0.5, id: 3 },
    { name: 'Social media', weight: 0.2, id: 4 }
], activityType => db.model('activityType').create(activityType));


const seedActivity = () => db.Promise.each([
    { date: Date.UTC(2016, 1, 30, 8, 30), activityTypeId: 1, relationshipId: 1 },
    { date: Date.UTC(2016, 2, 15, 9, 30), activityTypeId: 2, relationshipId: 1 },
    { date: Date.UTC(2016, 1, 15, 8, 40), activityTypeId: 3, relationshipId: 1 },
    { date: Date.UTC(2016, 1, 23, 9, 45), activityTypeId: 4, relationshipId: 2 },
    { date: Date.UTC(2016, 1, 27, 14, 30), activityTypeId: 1, relationshipId: 2 },
    { date: Date.UTC(2016, 3, 4, 8, 10), activityTypeId: 2, relationshipId: 2 },
    { date: Date.UTC(2016, 4, 18, 15, 50), activityTypeId: 3, relationshipId: 3 },
    { date: Date.UTC(2016, 6, 25, 11, 30), activityTypeId: 4, relationshipId: 3 },
    { date: Date.UTC(2016, 3, 7, 8, 40), activityTypeId: 1, relationshipId: 3 },


], activity => db.model('activity').create(activity));


const seedSpecialDates = () => db.Promise.each([
    { date: Date.UTC(2016, 2, 15), type: 'call', score: 5, relationshipId: 1 },
    { date: Date.UTC(2016, 12, 25), type: 'text', score: 2, relationshipId: 2 },
    { date: Date.UTC(2016, 1, 1), type: 'email', score: 1.5, relationshipId: 3},
], specialDates => db.model('specialDates').create(specialDates));

db.didSync
    .then(() => db.sync({ force:true }))
    .then(seedUser)
    .then(seedActivityType)
    .then(seedRelationship)
    .then(seedActivity)
    .then(seedSpecialDates)
    .catch(error => console.error(error));

