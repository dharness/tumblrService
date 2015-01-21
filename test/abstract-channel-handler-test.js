/**
 * Copyright Digital Engagement Xperience Inc. 2014
 *
 */
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

// tested package
var AbstractChannelHandler = require('../lib/abstract-channel-handler');

describe('abstractChannelHandler', function() {

    var handler = new AbstractChannelHandler();

    it('accept', function (done) {
        var result = handler.accept(null);
        result.should.equal(false);
        done();
    });

    it('deliver', function (done) {
        handler.deliver(null, null, function (error) {
            should.exist(error);
            done();
        });
    });

    it('getFeedback', function (done) {
        handler.getFeedback(null, function (error, result) {
            should.exist(error);
            should.not.exist(result);
            done();
        });
    });

    it('remove', function (done) {
        handler.remove(null, function (error) {
            should.exist(error);
            done();
        });
    });
});