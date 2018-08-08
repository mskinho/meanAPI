/* ===================
   Import Node Modules
=================== */
const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const app = express(); // Initiate Express Application

const router = express.Router(); // Creates a new router object.
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise;
const config = require('./config/database'); // Mongoose Config
const path = require('path'); // NodeJS Package for file paths
// const authentication = require('./routes/authentication')(router); // Import Authentication Routes
// const tickets = require('./routes/tickets')(router); // Import Ticket Routes
// const comments = require('./routes/comments')(router);
// const condominios = require('./routes/condominios')(router); // Import Condominio Routes
// const addresses = require('./routes/addresses')(router); // Import Ticket Routes
// const publicidades = require('./routes/publicidades')(router);
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const http = require('http').Server(app);


const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const port = process.env.PORT || '8080';

 // Allows heroku to set port
// Database Connection
mongoose.connect(config.uri,  (err) => {
  // Check if database was able to connect
  if (err) {
    console.log('Could NOT connect to database: ', err); // Return error message
  } else {
    console.log('Connected to ' + config.db); // Return success message
  }
}); 

// Middleware
app.use(cors('Access-Control-Allow-Origin', '*'));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(__dirname + '/client')); // Provide static directory for frontend
// app.use('/authentication', authentication); // Use Authentication routes in application
// app.use('/tickets', tickets); // Use Ticket routes in application
// app.use('/comments', comments); 
// app.use('/condominios', condominios); //Use Condominio routes in application
// app.use('/addresses', addresses); 
// app.use('/publicidades', publicidades);


// Start Server: Listen on port 8080
app.listen(port, () => {
  console.log('Listening on port ' + port + ' in ' + process.env.NODE_ENV + ' mode');
});
