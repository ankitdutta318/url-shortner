'use strict';

// Require dependencies
const randomString = require('randomString');

module.exports = {
    getShortUrl : (urlToShorten) => {
                        let shorterUrl = 'short.url/';
                        shorterUrl += randomString.generate(6);
                        return shorterUrl;
                    }
}