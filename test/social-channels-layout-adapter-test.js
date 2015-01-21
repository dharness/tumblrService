/**
 * Copyright Digital Engagement Xperience Inc. 2014
 *
 */
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

/* tested package */
var SocialChannelAdapter = require('../lib/social-channels-layout-adapter');
var _ = require('underscore');

describe('SocialChannelAdapter', function () {

    it('create with undefined multimedia', function (done) {
        var adapter = new SocialChannelAdapter();
        adapter.createSocialLayout(null, function (err, result) {
            should.exist(err);
            done();
        });

    });

    it('create with video and text', function (done) {
        var item = {
            multimedia: {
                video: [
                    {'kind': "multimediabody#video", property: {location: 'hello.jpg'}}
                ],
                text: [
                    {kind: 'multimediabody#text', property: {content: 'test text'}}
                ]}
        };
        var adapter = new SocialChannelAdapter();
        adapter.createSocialLayout(item, function (err, result) {
            should.not.exist(err);
            should.exist(result.media);
            should.equal("multimediabody#video", result.media.kind);
            should.equal("hello.jpg", result.media.property.location);
            should.exist(result.title);
            should.equal("multimediabody#text", result.title.kind);
            should.equal("test text", result.title.property.content);
            done();
        });

    });

    it('create with image and text', function (done) {
        var item = {
            multimedia: {
                image: [
                    {'kind': "multimediabody#image", property: {location: 'hello.jpg'}}
                ],
            text: [
                {kind: 'multimediabody#text', property: {content: 'test text'}}
            ]}
        };
        var adapter = new SocialChannelAdapter();
        adapter.createSocialLayout(item, function (err, result) {
            should.not.exist(err);
            should.exist(result.media);
            should.equal("multimediabody#image", result.media.kind);
            should.equal("hello.jpg", result.media.property.location);
            should.exist(result.title);
            should.equal("multimediabody#text", result.title.kind);
            should.equal("test text", result.title.property.content);
            done();
        });

    });


    it('create with link and text', function (done) {
        var item = {
            multimedia: {
                link: [
                    {'kind': "multimediabody#link", property: {location: 'hello.jpg'}}
                ],
            text: [
                {kind: 'multimediabody#text', property: {content: 'test text'}}
            ]}
        };
        var adapter = new SocialChannelAdapter();
        adapter.createSocialLayout(item, function (err, result) {
            should.not.exist(err);
            should.exist(result.media);
            should.equal("multimediabody#link", result.media.kind);
            should.equal("hello.jpg", result.media.property.location);
            should.exist(result.title);
            should.equal("multimediabody#text", result.title.kind);
            should.equal("test text", result.title.property.content);
            done();
        });

    });

    it('create with image and multiline text', function (done) {
        var item = {
            multimedia: {
                image: [
                    {'kind': "multimediabody#image", property: {location: 'hello.jpg'}}
                ],
                text: [
                    {kind: 'multimediabody#text', property: {content: 'first line'}},
                    {kind: 'multimediabody#text', property: {content: 'second line'}}
                ]}
        };
        var adapter = new SocialChannelAdapter();
        adapter.createSocialLayout(item, function (err, result) {
            should.not.exist(err);
            should.exist(result.media);
            should.equal("multimediabody#image", result.media.kind);
            should.equal("hello.jpg", result.media.property.location);
            should.exist(result.title);
            should.equal("multimediabody#text", result.title.kind);
            should.equal(item.multimedia.text[0].property.content + "\n"+item.multimedia.text[1].property.content , result.title.property.content);
            done();
        });

    });

});



