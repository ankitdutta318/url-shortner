'use strict';

// Require dependencies
const express               = require('express');
const bodyParser            = require('body-parser');
const cors                  = require('cors');
const mongoose              = require('mongoose');
const shortUrl              = require('./models/shortUrl');
const { getShortUrl }       = require('./helper');
const app                   = express();        // Setting up 'express' instance
app.use(bodyParser.json());                     // Setting up 'bodyparser' instance
app.use(cors());                                // Setting up 'CORS' instance


// Connect to our DB
mongoose.connect('mongodb://localhost/shortUrl');

app.use(express.static(__dirname + '/public'));

// Creates the DB entry 
app.get('/new/:urlToShorten(*)', (req, res, next) => {
    let { urlToShorten }    = req.params;          // using ES6 destructuring

    // Regex for URL
    var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

    if(regex.test(urlToShorten) === true) {

        let shorterUrl = getShortUrl(urlToShorten);
        let data = new shortUrl ({
            originalUrl : urlToShorten,
            shorterUrl
        });
        
        data.save()
        .then((err) => {
            if(err) {
                return res.status(503).json({
                    status: 'failed',
                    message: 'error saving to DB'
                })
            }
        });
        return res.status(200).json({
            status: 'success',
            originalUrl: data.originalUrl,
            shortUrl: data.shorterUrl
        })
    }
    return res.status(401).json({
        status: 'failed',
        message: 'invalid URL'
    });
});

//


// Setup port for running server
const port = process.env.PORT || 3000;

// Setting up our server
app.listen(port, () => console.log(`App is running on port ${port}`));