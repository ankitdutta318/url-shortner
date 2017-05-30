'use strict';

// Require dependencies
const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const mongoose      = require('mongoose');
const shortUrl      = require('./models/shortUrl');

const app           = express();                // Setting up 'express' instance
app.use(bodyParser.json());                     // Setting up 'bodyparser' instance
app.use(cors());                                // Setting up 'CORS' instance


app.use(express.static(__dirname + '/public'));

// Creates the DB entry 
app.get('/new/:urlToShorten(*)', (req, res, next) => {
    let { urlToShorten } = req.params;          // using ES6 destructuring

    return res.json({urlToShorten});
});

//


// Setup port for running server
const port = process.env.PORT || 3000;

// Setting up our server
app.listen(port, () => console.log(`App is running on port ${port}`));