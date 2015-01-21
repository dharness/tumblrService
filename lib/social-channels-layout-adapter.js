/**
 * Copyright Digital Enagement Xperiance 2014
 *
 */


var logger = require('./util/logger');

function SocialChannelLayoutAdapter() {

}

/**
 * select multimedia to be displayed layout suitable for social channels.
 * @param layout
 * @param callback
 */
SocialChannelLayoutAdapter.prototype.createSocialLayout = function (item, callback) {

    if (!item || !item.multimedia) {
        logger.error("resource:SocialChannelLayoutAdapter, error: layout multimedia is undefined");
        return  callback("layout multimedia is undefined");
    }
    var multimedia = item.multimedia;
    var result = {};
    if (multimedia.video && multimedia.video.length > 0) {
        /* use first video */
        result.media =  multimedia.video[0];
    }
    if (!result.media && multimedia.image && multimedia.image.length > 0) {
        /* use first image */
        result.media = multimedia.image[0];

    } else if (!result.media && multimedia.link.length > 0) {
        result.media = multimedia.link[0];
    }

    /* add title if available */
    if (multimedia.text && multimedia.text.length > 0) {
        result.title ={
            kind:"multimediabody#text",
            property:{}
        }

        var content =[]
        multimedia.text.forEach(function(text){
            content.push(text.property.content);
        })
        result.title.property.content = content.join('\n');
    }

    /* 
     *  deploy API requirs multimedia!!!
     */
    if (result.media || result.title) {
        if (!result.media) {
            result.media = result.title;
            delete result.title;
        }
    } else {
        result = null;
    }
    logger.info("resource:SocialChannelLayoutAdapter, message:social layout successfully adapted for social channels," +
        " multimedia:" + JSON.stringify(result));
    callback(null, result);


}

module.exports = SocialChannelLayoutAdapter;
