const express = require('express');
const userRouter = express.Router();
const db = require('../../db');

// get all users
userRouter.get('/', (req, res, next) => {
  db.model('user').findAll()
  .then(users => {
    res.json(users);
  })
  .catch(next);
})

// get user by ID
userRouter.get('/:userID', (req, res, next) => {
  db.model('user').findById(req.params.userID)
  .then(user => {
    res.json(user);
  })
  .catch(next);
})


// when a user logs in with google, find or create that user
userRouter.post('/', (req, res, next) => {
  db.model('user').findOrCreate({
    where: {
      email: req.body.email,
    },
    defaults: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      authId: req.body.authId
    }
  })
  .spread((user, wasCreated) => {
    if (wasCreated){
      res.status(201).json(user);
    } else {
      res.json(user);
    }
  })
  .catch(next);
});

// update an user
userRouter.put('/:userID', (req, res, next) => {
  db.model('user').findById(req.params.userID)
  .then(user => {
    return user.update(req.body)
  })
  .then(updatedUser => {
    res.status(201).send(updatedUser);
  })
  .catch(next);
})

// delete an user
userRouter.delete('/:userID', (req, res, next) => {
  db.model('user').findById(req.params.userID)
  .then(user => {
    return user.destroy()
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next);
})


module.exports = userRouter; 