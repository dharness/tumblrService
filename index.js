/**
 * Copyright Digital Engagement Xperience 2014
 * Created by Andrew
 *
 */

/*jslint node: true */
'use strict';

module.exports = {
    // building blocks for third-party handlers
    serviceTemplate: require('./lib/service-template'),
    handlerRoute: require('./routes/route_handler'),
    AbstractHandler: require('./lib/abstract-channel-handler'),

    // utilities for third-party handlers
    translateFeedback: require('./lib/content-feedback'),
    socialChannelsLayoutAdapter: require('./lib/social-channels-layout-adapter')
};
