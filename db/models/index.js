/* ------ REQUIRE OUR MODELS ------ */

const Activity = require('./activity');
const Relationship = require('./relationship');
const User = require('./user');
const SpecialDates = require('./specialDates');
const ActivityType = require('./activity-type');

/* ------ ASSOCATIONS ------ */

User.hasMany(Relationship); // relationship will have user_id // user.getRelationship/setRelationship
Relationship.belongsTo(User); // user will have relationship_id // relationship.getUser/setUser

Relationship.hasMany(Activity); // activity will have a relationship_id // relationship.getActivity/setActivity
Activity.belongsTo(Relationship); // relationship will have activity_id // activity.getRelationship/setRelationship

Activity.belongsTo(ActivityType); // activity will have activityTypeId

Relationship.hasMany(SpecialDates); // specialDates will have a relationship_id // relationship.getSpecialDates/setSpecialDates
SpecialDates.belongsTo(Relationship); // relationship will have specialDates_id // specialDates.getRelationship/setRelationship

module.exports = { Activity, Relationship, User, ActivityType };
