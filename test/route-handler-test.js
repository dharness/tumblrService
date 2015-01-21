/**
 * Copyright Digital Engagement Xperience 2014
 * Created by Andrew on 11/12/2014
 */

var express = require('express');
var bodyParser = require('body-parser');
var supertest = require('supertest');

var HttpCodeError = require('../lib/util/http-code-error');

var AbstractHandler = require('../lib/abstract-channel-handler');
var handler = new AbstractHandler();

// create dummy express app with routes using handler
var app = express().use(bodyParser.json());
require('../routes/route_handler')(app, handler);
app.use(require('../routes/rest-error-handler'));

describe('Handler Route', function () {

    it('accept', function (done) {
        handler.accept = function (channel) {
            return true;
        };
        supertest(app)
            .post('/accept')
            .send()
            .expect(200)
            .expect({accepted: true}, done);
    });

    it('deliver', function (done) {
        handler.deliver = function (params, playlist, callback) {
            callback(null, "foo");
        };
        supertest(app)
            .post('/deliver')
            .send({
                params: {},
                playlist: []
            })
            .expect(200)
            .expect("foo", done);
    });

    it('deliver error', function (done) {
        handler.deliver = function (params, playlist, callback) {
            callback(new HttpCodeError(404));
        };
        supertest(app)
            .post('/deliver')
            .send({
                params: {},
                playlist: []
            })
            .expect(404, done);
    });

    it('feedback', function (done) {
        handler.getFeedback = function (params, callback) {
            callback(null, {foo: 'bar'});
        };
        supertest(app)
            .post('/feedback')
            .send()
            .expect(200)
            .expect({foo: 'bar'}, done);
    });

    it('feedback error', function (done) {
        handler.getFeedback = function (params, callback) {
            callback(new HttpCodeError(400));
        };
        supertest(app)
            .post('/feedback')
            .send()
            .expect(400, done);
    });

    it('remove', function (done) {
        handler.remove = function (scInstances, callback) {
            callback();
        };
        supertest(app)
            .post('/remove')
            .send()
            .expect(200, done);
    });

    it('remove error', function (done) {
        handler.remove = function (scInstances, callback) {
            callback(new HttpCodeError(403));
        };
        supertest(app)
            .post('/remove')
            .send()
            .expect(403, done);
    });
});
