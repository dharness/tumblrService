/**
 * Copyright Digital Engagement Xperience 2014
 * Created by Andrew on 26/11/2014
 */

module.exports = function (err, req, res, next) {
    if (err) {
        var status = err.httpCode || 500;
        res.format({
            'application/json': function () {
                var resultJson = {
                    status: status,
                    message: err.message
                };
                res.status(status).send(resultJson);
            },
            'text/plain': function () {
                var resultText = "Error: " + status + " " + err.message;
                res.status(status).send(resultText);
            },
            'text/html': function () {
                var resultHtml = "<html><h1>Error: " + status + "</h1>\n<p>" + err.message + "</p></html>";
                res.status(status).send(resultHtml);
            },
            'default': function () {
                // log the request and respond with 406
                res.status(406).send('Not Acceptable');
            }
        });
    } else {
        // shouldn't ever get here, pass to next for Express to deal with
        next();
    }
};
