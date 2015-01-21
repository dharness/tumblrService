/**
 * Copyright Digital Engagement Xperience 2014
 * Created by Andrew
 *
 */

/*jslint node: true */
'use strict';

// third party modules
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// internal modules
var HttpCodeError = require('./util/http-code-error');
var logger = require('./util/logger');

/**
 * Start up a third-party channel handler application at the specified path.
 *
 * @param {string} path URL path base for handler service
 * @param {AbstractChannelHandler} handler handler for processing third-party channel requests
 * @param {string} [port] port to listen on
 */
module.exports = function(path, handler, port) {

    /*
     ===============================================================
     Express Application Setup
     ===============================================================
     */
    var app = module.exports = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(morgan('dev', {
        stream: {
            write: function(message, encoding) {
                // strip off newline from message since logger will add one anyways
                logger.info(message.replace(/[\r\n]*$/, ''));
            }
        }
    }));

    /*
     ===============================================================
     Application Routes
     ===============================================================
     */
    // routes for channel handler
    var router = express.Router();
    app.use(path, require('../routes/route_handler')(router, handler));

    // catch-all error handler
    app.use(function(req, res, next) {
        next(new HttpCodeError(404, 'The resource you requested does not exist.'));
    });
    app.use(require('../routes/rest-error-handler'));
    require('../routes/tumblr_routes.js')(app);

    /*
     ===============================================================
     Application Service Start
     ===============================================================
     */
    var processport = port || process.env.PORT || 5050;
    app.listen(processport);

    console.log("Listening on port: " + processport);

    return app;
};