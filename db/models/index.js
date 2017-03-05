/* ------ REQUIRE OUR MODELS ------ */

const Activity = require('./activity');
const Relationship = require('./relationship');
const User = require('./user');
const SpecialDates = require('./specialDates');

/* ------ ASSOCATIONS ------ */

User.hasMany(Relationship); // relationship will have user_id // user.getRelationship/setRelationship
Relationship.belongsTo(User); // user will have relationship_id // relationship.getUser/setUser

Relationship.hasMany(Activity); // activity will have a relationship_id // relationship.getActivity/setActivity
Activity.belongsTo(Relationship); // relationship will have activity_id // activity.getRelationship/setRelationship

Relationship.hasMany(SpecialDates); // specialDates will have a relationship_id // relationship.getSpecialDates/setSpecialDates
SpecialDates.belongsTo(Relationship); // relationship will have specialDates_id // specialDates.getRelationship/setRelationship

module.exports = { Activity, Relationship, User};
