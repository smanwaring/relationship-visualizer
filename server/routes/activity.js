const express = require('express');
const activityRouter = express.Router();
const db = require('../../db');

// get all activities
activityRouter.get('/', (req, res, next) => {
  db.model('activity').findAll()
  .then(activities => {
    res.json(activities);
  })
  .catch(next);
})

// get activity by ID
activityRouter.get('/:activityID', (req, res, next) => {
  db.model('activity').findById(req.params.activityID)
  .then(activity => {
    res.json(activity);
  })
  .catch(next);
})

// get all activities by relationship
activityRouter.get('/relationship/:relationshipID', (req, res, next) => {
  db.model('activity').findAll({
    where: { relationshipId: req.params.relationshipID }
  })
  .then(activities => {
    res.json(activities);
  })
})

// create a new activity
activityRouter.post('/', (req, res, next) => {
  console.log(req.body);
  db.model('activity').create(req.body)
  .then(activity => {
    res.status(201).json(activity)
  })
  .catch(next);
})

// update an activity
activityRouter.put('/:activityID', (req, res, next) => {
  db.model('activity').findById(req.params.activityID)
  .then(activity => {
    return activity.update(req.body)
  })
  .then(updatedActivity => {
    res.status(201).send(updatedActivity);
  })
  .catch(next);
})

// delete an activity
activityRouter.delete('/:activityID', (req, res, next) => {
  db.model('activity').findById(req.params.activityID)
  .then(activity => {
    return activity.destroy()
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next);
})


module.exports = activityRouter;