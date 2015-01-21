/**
 * Copyright Digital Engagement Xperience 2014
 * Created by Andrew on 26/11/2014
 */

var supertest = require('supertest');
var HttpCodeError = require('../lib/util/http-code-error');

// module under test
var errorHandler = require('../routes/rest-error-handler');

// set up dummy Express app which generates error
var app = require('express')();
app.get('/test', function (req, res, next) {
    next(new HttpCodeError(404, 'foo'));
});
app.use(errorHandler);

describe('REST Error Handler', function () {

    it('accept JSON', function (done) {
        supertest(app)
            .get('/test')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

    it('accept HTML', function (done) {
        supertest(app)
            .get('/test')
            .set('Accept', 'text/html')
            .expect('Content-Type', /html/)
            .expect(404, done);
    });

    it('accept text', function (done) {
        supertest(app)
            .get('/test')
            .set('Accept', 'text/plain')
            .expect('Content-Type', /plain/)
            .expect(404, done);
    });

    it('default', function (done) {
        supertest(app)
            .get('/test')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

    it('invalid accept', function (done) {
        supertest(app)
            .get('/test')
            .set('Accept', 'image/jpeg')
            .expect(406)
            .expect('Not Acceptable', done);
    });
});
