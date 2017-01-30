// init router
const api = require('express').Router();
const db = require('../../db')

// require your Models up here...

//put your routes here....

api
  .get('/heartbeat', (req, res) => res.send({ok: true,}))
  .use('/activity', require('./activity'));



api.use((err, req, res, next) => {
  console.log("HORRIBLE SERVER ERROR", err)
  res.status(500).send(err);
})

// No API routes matched? 404.
api.use((req, res) => res.status(404).end())

module.exports = api;