/**
 * Copyright Digital Engagement Xperience 2015
 * Created by Andrew on 07/01/2015
 */

"use strict";

var util = require('util');

// error which carries an HTTP status code
var HttpCodeError = function (status, message, errors) {
    Error.call(this);
    this.httpCode = status || 500;
    this.message = message || 'Error';
    this.errors = errors;
};
util.inherits(HttpCodeError, Error);
HttpCodeError.prototype.httpCode = 500;
HttpCodeError.prototype.name = 'HTTP Error';

module.exports = HttpCodeError;