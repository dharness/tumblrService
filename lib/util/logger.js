/**
 * Copyright Digital Engagement Xperience Inc. 2015
 * User: Shawn Talbot
 */
"use strict";
var winston = require('winston');

var customLevels ={
    levels:{ silly: 0,
        trace: 1,
        verbose: 1,
        debug: 2,
        info: 3,
        warn: 4,
        error: 5
    },
    colors : {
        silly: 'magenta',
        trace: 'cyan',
        verbose: 'cyan',
        debug: 'blue',
        info: 'green',
        warn: 'yellow',
        error: 'red'
    }};


var loggingLevel = {};
if (process.env.LOGGING_LEVEL) {
    console.log('custom logging level was set to:' + process.env.LOGGING_LEVEL);
    loggingLevel = process.env.LOGGING_LEVEL;
} else {
    loggingLevel = 'info';
}

//default output style for console now
var stringifyMe = function(output) {
    var str = new Date().toISOString() + " -> " + output.level + ": " + output.message;
    if (Object.keys(output).length > 2) {
        delete output.level;
        delete output.message;
        str += " " + JSON.stringify(output);
    }
    return str;
};

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({level:loggingLevel, json: true, stringify:stringifyMe})
    ],
    levels: customLevels.levels
});

module.exports = logger;
