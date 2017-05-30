'use strict';

// Require dependencies
const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const mongoose      = require('mongoose');

const app           = express();                // Setting up 'express' instance
app.use(bodyParser.json());                     // Setting up 'bodyparser' instance
app.use(cors());                                // Setting up 'CORS' instance

// Setup port for running server
const port = process.env.PORT || 3000;

// Setting up our server
app.listen(port, () => console.log(`App is running on port ${port}`));