const express = require('express');
const relationshipRouter = express.Router();
const db = require('../../db');
const Activity = db.model('activity');
const scoreGenerator = require('../utils/score');

// GET all relationships
relationshipRouter.get('/', (req, res, next) => {
  db.model('relationship').findAll()
  .then(relationships => {
    res.json(relationships);
  })
  .catch(next);
});

// GET relationship by ID
relationshipRouter.get('/user/:userId/rel/:relationshipId', (req, res, next) => {
  db.model('relationship').findOne({
    where: {
      id: req.params.relationshipId,
      userId: req.params.userId
    },
    include: [ {model: Activity} ]
  })
  .then(relationship => {
    if (!relationship){
      res.sendStatus(404);
    } else {
      let relationshipObj = {
          name: relationship.name,
          type: relationship.type,
          color: relationship.color,
          id: relationship.id
      };
      relationshipObj.score = scoreGenerator(relationship.activities);
      return relationshipObj;
    }
  })
  .then(relationshipObject => res.json(relationshipObject))
  .catch(next);
});

//GET all relationships by user and generate the score for each before sending it back
relationshipRouter.get('/user/:userID', (req, res, next) => {
  db.model('relationship').findAll({
    where: {
      userId: req.params.userID
    },
    include: [{model: Activity }]
  })
  .then(relationships => {
    return relationships.map(relationship => {
      let relationshipObj = {
        name: relationship.name,
        type: relationship.type,
        color: relationship.color,
        id: relationship.id
      };
      relationshipObj.score = scoreGenerator(relationship.activities);
      return relationshipObj;
    });
  })
  .then(relationshipsWithScore => res.json(relationshipsWithScore))
  .catch(next);
});


// POST a new relationship if the name doesn't already exist with that specific user
relationshipRouter.post('/', (req, res, next) => {
  db.model('relationship').findOrCreate({
    where: {
      name: {$iLike: req.body.name},
      userId: req.body.userId
    },
    defaults: {
      color: req.body.color,
      userId: req.body.userId,
      type: req.body.type,
    }
  })
  .spread( (relationship, wasCreated) => {
    if (!wasCreated) {
      res.sendStatus(204);
    } else {
      let resObj = {
        name: relationship.name,
        userId: relationship.userId,
        color: relationship.color,
        type: relationship.tyle,
        score: 50
      };
      res.json(resObj);
    }
  })
  .catch(next);
});

// PUT/UPDATE a relationship
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

// DELETE a relationship
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