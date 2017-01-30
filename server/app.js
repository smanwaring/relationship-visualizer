const bodyParser = require('body-parser');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');
const http = require('http');
const express = require('express');
const app = express(); //invoke router as app
const server = http.createServer();
const routes = require('./routes') ;
const db = require('../db');

//require in our models
require('../db/models');

server.on('request', app);

const PATHS = {
  indexHTML: path.join(__dirname, '../public/index.html'),
  public: path.join(__dirname, '../public'),
}

// init router ('app')
app
  .use(express.static(PATHS.public)) //server up public files
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(morgan('dev'))
  //use our routes for anything /api   
  .use('/api', routes) 

// default routing
app.get('/*', function(req, res){
  res.sendFile(PATHS.indexHTML)
});

// Error handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'testing') {
    console.error(chalk.red(err));
    console.error(chalk.red(err.stack))
  }
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});


server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
    // db.sync({})
    //   .then(function () {
    //   console.log('Oh and btw the postgres server is totally connected, too');
  // });
});



// export app 
module.exports = app;
