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
        return res.status(200).json(data);
    }
    let data = new shortUrl({
        originalUrl: 'urlToShorten doesnot match standard format',
        shorterUrl: 'Invalid Url'
    });
});

// Query DB and forward to original URL
app.get('/:urlToForward', (req, res, next) => {
    // Stores the value of param
    let shorterUrl = req.params.urlToForward;

    shortUrl.findOne({'shorterUrl': shorterUrl}, (err, data) => {
        console.log(data);
        if(err) {
            console.log(err);
            return res.send('Error reading database');
        }
        let re = new RegExp("^(http|https)://", "i");
        let strToCheck = data.originalUrl;
        if(re.test(strToCheck)) {
            res.redirect(301, data.originalUrl);
        } else {
            res.redirect(301, 'http://' + data.originalUrl);
        }
     });
});


// Setup port for running server
const port = process.env.PORT || 3000;

// Setting up our server
app.listen(port, () => console.log(`App is running on port ${port}`));