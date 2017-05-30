'use strict';

// Require dependencies
const randomString = require('randomString');

module.exports = {
    getShortUrl : (urlToShorten) => {
                        let shorterUrl = '';
                        shorterUrl += randomString.generate(6);
                        return shorterUrl;
                    }
}