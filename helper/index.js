'use strict';

// Require dependencies
const randomString = require('randomString');

module.exports = {
    getShortUrl : (urlToShorten) => {
                        let shorterUrl = 'ti.ny/';
                        shorterUrl += randomString.generate(6);
                        return shorterUrl;
                    }
}