'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');  //Router method allowing everythin to /api w/o listing on every route

const app = express();
app.use(express.json());
app.use('/api', routes);  //When request starts with /api, use routes inside routes.js file

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
//const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// TODO setup your api routes here
//Send a GET request to read a list of requests
//Send a GET request to READ(view) a quote
//Send a POST request to CREATE a new quote
//Send a PUT request to UPDATE (edit) a quote
//Send a DELETE reuest to DELETE a quote

// //Send a GET request to read a list of requests
// app.get('/quotes', async (req, res) => {
//   const quotes = await records.getQuotes();
//   res.json(quotes);
// });

//   //Send a GET request to /quotes/:id to READ(view) a quote
//   app.get('/quotes/:id', async (req, res) => {
//     try {
//       const quote = await records.createQuote(req.params.id);
//       if (quote) {res.json(quote);
        
//       } else {
//         res.status(404).json({
//           message: "Quote not found"
//         });
//       }

//     } catch (err) {
//       res.status(500).json({
//         message: err.message
//       });
//     }
//   });

//   //Send a PUT request to UPDATE (edit) a quote
//   app.get('/quotes/:id', async (req, res) => {
//     try {
//       const quote = await records.createQuote(req.params.id);
//       if (quote){
//         quote.req.body.quote;
//         quthor.req.body.author;

//         await records.updateQuote(quote);
//         res.status(204).end();
//       } else {
//         res.status(404).json({message: "Quote not found"});
//       }

//     } catch (err) {
//       res.status(500).json({message: err.message});
//     }
//   });

//   //Send a DELETE reuest to DELETE a quote
//   app.delete('/quotes/:id', async (req, res) => {
//     try {
//       const quote = await records.getQuote(req.params.id);
//       await records.delete.Quote(quote);
//       res.status(204).end();
//     } catch(err){
//       res.status(500).json({message: err.message});
//     }
//   });

//   //Send a GET request to /quotes to READ(view) a quote
//   /*app.get('/quotes/:id', async (req, res) => {
//     const quote = await data.quotes.find(quote => quote.id == req.params.id);
//     res.json(quote);
//   });*/

//   //Send a POST request to /quotes to CREATE a new quote
//   app.post('/quotes/:id', async (req, res) => {
//     try {
//       if(req.body.author && req.body.quote){
//       const quote = await records.createQuote({
//         quote: req.body.quote,
//         quthor: req.body.author
//       });
//       res.status(201).json(quote);
//     } else {
//       res.status(400).json({message: "Quete and author required"});
//     }
//     } catch (err) {
//       res.status(500).json({message: err.message});
//     }
  

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