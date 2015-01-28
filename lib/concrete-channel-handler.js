/**
 * Copyright Dylan Harness, Joe Gaebel 2014
 * Created by Dylan and Joe
 *
 */

var util = require('util'),
    AbstractChannelHandler = require('./abstract-channel-handler'),
    logger = require('./util/logger'),
    tumblr = require('tumblr.js'),
    translateFeedback = require('../lib/content-feedback');

/**
 * Constructor for concrete channel handlers.
 * @constructor
 */
function MyChannelHandler() {

    this.feedback = {};
    this.blogName = 'dylsaucem';
    this.brandonAllen = false;

    this.client = tumblr.createClient({
        consumer_key: 'wEYVdOMuP7DbgDM8s3FSZnUojUg0p5Se64GT3ruRlu97FI9Imc',
        consumer_secret: 'YF5AHSCecFemLmG6fNRd0XrzscMGUTpMECEYdhTnbXySl41POt',
        token: 'CrTWa6H5untVGirVoUjJPG0wLMLgNjyngQd6RTTS71R1cbLrDg',
        token_secret: '4PfLvDGm2kHwrix0cfgUGwNwvcpSM2dExsBPfkWcTRIXYtNUAE'
    });
}

util.inherits(MyChannelHandler, AbstractChannelHandler);


/**
 * Determine whether a channel instance is compatible with the handler.
 *
 * @param {Object} channel channel instance to test
 * @return {Boolean} true if accepted, false otherwise
 */
MyChannelHandler.prototype.accept = function(channel) {

    //check if the url is a tumblr url
    (channel.url.indexOf("tumblr") > -1) && (logger.print('valid tumblr', channel.url))

    // do some dex logging
    logger.info(buildLogMsg("accept", "msg: not supported by this channel handler"));
    return true;
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
MyChannelHandler.prototype.deliver = function(params, playlist, callback) {

    //--------------------------- PHOTO POST ---------------------------

    var photo_options = {
        caption: playlist[0].multimedia.text[0].property.content,
        link: playlist[0].multimedia.image[0].url,
        source: playlist[0].multimedia.image[0].property.location
    };

    this.client.photo(this.blogName, photo_options, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            //console.log(data);
            callback(null, data);
        }
    });


};


/**
 * Get feedback (e.g. replies, comments) from previously delivered content.
 * Result should be an array of objects which use the format provided by
 * translateFeedback().
 *
 * @param {Object} params content parameters
 * @param {Function} callback invoked as callback([error], [result]) when finished
 */
//JOENOTE: the post to /feedback must have an id called 
MyChannelHandler.prototype.getFeedback = function(params, callback) {
    params.reblog_info = true;
    params.notes_info = true;

    this.client.posts(this.blogName, params, function(err, resp) {
        var feedback = [];
        for (var i = 0; i < resp.posts[0].notes.length; i++) {
            var note = resp.posts[0].notes[i];
            //translateFeedback(feedbackId, fromId, fromName, message, time)
            feedback.push(
                (note.added_text ?
                    translateFeedback(resp.posts[0].id, note.blog_url, note.blog_name, note.added_text, note.timestamp) :
                    translateFeedback(resp.posts[0].id, note.blog_url, note.blog_name, note.type, note.timestamp)
                )
            );

        }
        callback(err, feedback);
    });


    // logger.info(buildLogMsg("getFeedback", "msg: not supported by this channel handler"));
    //  callback(new HttpCodeError(501, 'getFeedback not implemented'));
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
MyChannelHandler.prototype.remove = function(postId, callback) {

    // Delete a given psot
    this.client.deletePost(this.blogName, postId, callback);

    // logger.info(buildLogMsg("remove", "msg: not supported by this channel handler"));
    // callback(new HttpCodeError(501, 'remove not implemented'));
};



module.exports = MyChannelHandler;