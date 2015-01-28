/**
 * Copyright Digital Engagement Xperience 2014
 * Created by Andrew
 *
 */
'use strict';

// third-party modules
var _ = require('underscore');
// internal modules
var logger = require('../lib/util/logger');

/**
 * Add routes for a third-party channel handler to an Express application.
 *
 * @param app express application
 * @param {AbstractChannelHandler} handler handler for processing third-party channel requests
 */
module.exports = function(app, handler) {

    if (!handler) {
        throw new Error('Service not found!');
    }

    app.post('/accept', function(req, res) {
        logger.debug("accept:", req.body);
        var accepted = handler.accept(req.body);
        logger.debug("accepted:", accepted);
        console.log(res)
        res.status(200).send({
            accepted: accepted
        });
    });

    app.post('/deliver', function(req, res, next) {

        handler.deliver(req.body.params, req.body.playlist, function(err, result) {

            if (err) {
                console.log(err);
                next(err);
            } else {

                var resMap = { // HACK but a small one, since result does not contain this functionality 
                    "scObjectId": req.body.playlist[0].scObj.id,
                    'postId': result.id
                };

                logger.debug("delivered:", resMap);
                res.status(200).send(resMap);
            }
        });
    });

    app.post('/feedback', function(req, res, next) {
        handler.getFeedback(req.body, function(err, feedback) {
            if (err) {
                next(err);
            } else {
                logger.debug("feedback:", feedback);
                res.status(200).send(feedback);
            }
        });
    });

    app.post('/remove', function(req, res, next) {

        handler.remove(req.body.scInstances.postId, function(err) {
            if (err) {
                next(err);
            } else {
                res.status(200).send('200 ok');
            }
        });
    });

    return app;
};