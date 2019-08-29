'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');   // setup morgan which gives us http request logging
const sqlite3 = require('sqlite3');
const routes = require('./routes'); //Router method allowing everythin to /api w/o listing on every route
const courseRoutes = require("./routes/courses");
const userRoutes = require("./routes/users");
//app.use('/api', routes); //When request starts with /api, use routes inside routes.js file
const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');

// variable to enable global error logging
//const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';
const app = express(); // create the Express app
app.use(express.json()); // Setup request body JSON parsing.
app.use(morgan('dev')); // Setup morgan which gives us HTTP request logging.
//const authenticateUser = (req, res, next) => {};

app.use(routes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);

// TODO setup your api routes here
//Send a GET request to read a list of requests
//Send a GET request to READ(view) a quote
//Send a POST request to CREATE a new quote
//Send a PUT request to UPDATE (edit) a quote
//Send a DELETE reuest to DELETE a quote

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});


//Send a POST request to /quotes to CREATE a new quote
/*app.post('/quotes/:id', async (req, res) => {
  try{
    throw new Error("Oh NOOOO something went wrong!");
    const quote = records.createQuote({
      quote: req.body.quote,
      quthor: req.body.author
    });
    res.json(quote);
}catch(err){
    res.json({message: err.message});
  }*/