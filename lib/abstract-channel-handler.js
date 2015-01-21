/**
 * Copyright Digital Engagement Xperience 2014
 * Created by Andrew
 *
 */

var HttpCodeError = require('./util/http-code-error');
var logger = require('./util/logger');

/**
 * Constructor for abstract channel handlers.
 * This class should be extended as necessary by concrete handler implementations.
 * @constructor
 */
function AbstractChannelHandler() {
}

function buildLogMsg(action, msg) {
    return "resource: abstract channel handler, action: " + action + ", " + msg;
}

/**
 * Determine whether a channel instance is compatible with the handler.
 *
 * @param {Object} channel channel instance to test
 * @return {Boolean} true if accepted, false otherwise
 */
AbstractChannelHandler.prototype.accept = function (channel) {
    logger.info(buildLogMsg("accept", "msg: not supported by this channel handler"));
    return false;
};

/**
 * Deliver a content playlist to a channel instance.
 * Result should be an array of objects corresponding to the posted SC instances.
 *
 * Result objects must at a minimum consist of { scObjectId: '...' } and should be
 * extended with any other data necessary to uniquely reference the deployed content
 * (e.g. post ID).
 *
 * @param {Object} params delivery parameters
 * @param {Object} playlist content playlist
 * @param {Function} callback invoked as callback([error], [result]) when finished
 */
AbstractChannelHandler.prototype.deliver = function (params, playlist, callback) {
    logger.info(buildLogMsg("deliver", "msg: not supported by this channel handler"));
    callback(new HttpCodeError(501, 'deliver not implemented'));
};

/**
 * Get feedback (e.g. replies, comments) from previously delivered content.
 * Result should be an array of objects which use the format provided by
 * translateFeedback().
 *
 * @param {Object} params content parameters
 * @param {Function} callback invoked as callback([error], [result]) when finished
 */
AbstractChannelHandler.prototype.getFeedback = function (params, callback) {
    logger.info(buildLogMsg("getFeedback", "msg: not supported by this channel handler"));
    callback(new HttpCodeError(501, 'getFeedback not implemented'));
};

/**
 * Remove previously delivered content from the channel instance.
 *
 * The SC instance objects passed in will match those which were provided in the
 * response to the deliver() call.
 *
 * @param {Object[]} scInstances SC instances to be deleted
 * @param {Function} callback invoked as callback([error]) when finished
 */
AbstractChannelHandler.prototype.remove = function (scInstances, callback) {
    logger.info(buildLogMsg("remove", "msg: not supported by this channel handler"));
    callback(new HttpCodeError(501, 'remove not implemented'));
};


module.exports = AbstractChannelHandler;