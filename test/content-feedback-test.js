/**
 * Copyright Digital Engagement Xperience Inc. 2014
 *
 */
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

// tested package
var translateFeedback = require('../lib/content-feedback');

describe('translateFeedback', function() {

    it('translateFeedback', function (done) {
        var result = translateFeedback("foo", "bar", "me", "blah", "now");
        expect(result).to.have.property('id', 'foo');
        expect(result).to.have.property('from');
        expect(result.from).to.have.property('id', 'bar');
        expect(result.from).to.have.property('name', 'me');
        expect(result).to.have.property('message', 'blah');
        expect(result).to.have.property('time', 'now');
        done();
    });

});