/**
 * Copyright Digital Engagement Xperience 2014
 * Created by Andrew on 27/11/2014
 */

var should = require('chai').should();

var HttpCodeError = require('../lib/util/http-code-error');

describe('HTTP Code Error', function () {

    it('create with defaults', function (done) {
        var err = new HttpCodeError();
        err.httpCode.should.equal(500);
        err.name.should.equal('HTTP Error');
        err.message.should.equal('Error');
        done();
    });

    it('create with values', function (done) {
        var err = new HttpCodeError(404, 'foo');
        err.httpCode.should.equal(404);
        err.name.should.equal('HTTP Error');
        err.message.should.equal('foo');
        done();
    });

});