/**
 * Copyright Digital Engagement Xperience 2014
 * Created by Andrew on 08/12/2014
 */

var baseHandler = require('./index');

// create my own channel handler which inherits from abstract handler
var myHandler = new baseHandler.AbstractHandler();

// extend/override the handler as necessary...

// invoke the service with my handler
var server = baseHandler.serviceTemplate('/myhandler', myHandler, process.env.PORT);

module.exports = server;