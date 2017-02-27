const express = require('express');
const relationshipRouter = express.Router();
const db = require('../../db');

// get all relationships
relationshipRouter.get('/', (req, res, next) => {
  db.model('relationship').findAll()
  .then(relationships => {
    res.json(relationships);
  })
  .catch(next);
});

// get relationship by ID
relationshipRouter.get('/:relationshipID', (req, res, next) => {
  db.model('relationship').findById(req.params.relationshipID)
  .then(relationship => {
    res.json(relationship);
  })
  .catch(next);
});

// get all relationships by user
relationshipRouter.get('/user/:userID', (req, res, next) => {
  db.model('relationship').findAll({
    where: { userId: req.params.userID },
    order: ['id']
  })
  .then(relationships => {
    res.json(relationships);
  })
  .catch(next);
});

// create a new relationship if the name doesn't already exist with that specific user
relationshipRouter.post('/', (req, res, next) => {
  db.model('relationship').findOrCreate({
    where: {
      name: req.body.name,
      userId: req.body.userId
    },
    defaults: {
      color: req.body.color,
      userId: req.body.userId,
      type: req.body.type,
      score: req.body.score
    }
  })
  .spread( (relationship, wasCreated) => {
    if (!wasCreated) {
      res.sendStatus(204);
    } else {
      res.json(relationship);
    }
  })
  .catch(next);
});

// update a relationship
relationshipRouter.put('/:relationshipID', (req, res, next) => {
  db.model('relationship').findById(req.params.relationshipID)
  .then(relationship => {
    return relationship.update(req.body);
  })
  .then(updatedRelationship => {
    res.status(201).send(updatedRelationship);
  })
  .catch(next);
});

// delete a relationship
relationshipRouter.delete('/:relationshipID', (req, res, next) => {
  db.model('relationship').findById(req.params.relationshipID)
  .then(relationship => {
    return relationship.destroy();
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next);
});


module.exports = relationshipRouter;