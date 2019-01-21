/*
* Unit testing for post service
* v1.0
*  2018-11-1
@C 2018, Prakash Rai
*/

const should = require('chai').should();
const sinon = require('sinon');
const P = require('bluebird');
const Path = require('path');
const mongoose = require('mongoose');
const TEST_MODULE = Path.resolve('./src/service/post.service');

describe("Post service Unit Test", function(){
    let mongoose, target;

    it('Read post list should return success', function(){
        const PostSchema = {
            find: sinon.stub().returns(P.resolve('success'))
        };
        target = require(TEST_MODULE)(mongoose, PostSchema);
        return target.readPosts()
            .then(function(resp) {
                should.exist(resp);
            });
    });

    it('DELETE post should return success', function(){
        const PostSchema = {
            findByIdAndRemove: sinon.stub().returns(P.resolve('success'))
        };
        target = require(TEST_MODULE)(mongoose, PostSchema);
        return target.deletePost()
            .then(function(resp) {
                should.exist(resp);
            });
    });

    it('Read post by id should return success', function(){
        const PostSchema = {
            find: sinon.stub().returns(P.resolve('success'))
        };
        target = require(TEST_MODULE)(mongoose, PostSchema);
        return target.readPostById()
            .then(function(resp) {
                should.exist(resp);
            });
    });

    it('Save post should return success', function(){
        let PostSchema = sinon.stub();
        PostSchema.prototype.save = sinon.stub().returns(P.resolve('success'));
        
        target = require(TEST_MODULE)(mongoose, PostSchema);
        return target.createPost()
            .then(function(resp) {
                should.exist(resp);
            });
    });

    it('UPDATE post should return success', function(){
        const PostSchema = {
            findOneAndUpdate: sinon.stub().returns(P.resolve('success'))
        };
        
        target = require(TEST_MODULE)(mongoose, PostSchema);
        return target.updatePost('12', { modifiedDateTime: new Date() })
            .then(function(resp) {
                should.exist(resp);
            });
    });

    it('Read post list should return error', function(){
        const PostSchema = {
            find: sinon.stub().returns(P.reject('error'))
        };
        target = require(TEST_MODULE)(mongoose, PostSchema);
        return target.readPosts()
            .catch(function(err) {
                should.exist(err);
            });
    });

    it('DELETE post should return err', function(){
        const PostSchema = {
            findByIdAndRemove: sinon.stub().returns(P.reject('error'))
        };
        target = require(TEST_MODULE)(mongoose, PostSchema);
        return target.deletePost()
            .catch(function(err) {
                should.exist(err);
            });
    });

    it('Read post by id should return err', function(){
        const PostSchema = {
            find: sinon.stub().returns(P.reject('err'))
        };
        target = require(TEST_MODULE)(mongoose, PostSchema);
        return target.readPostById()
            .catch(function(err) {
                should.exist(err);
            });
    });

    it('Save post should return err', function(){
        let PostSchema = sinon.stub();
        PostSchema.prototype.save = sinon.stub().returns(P.reject('err'));
        
        target = require(TEST_MODULE)(mongoose, PostSchema);
        return target.createPost()
            .catch(function(err) {
                should.exist(err);
            });
    });

    it('UPDATE post should return err', function(){
        const PostSchema = {
            findOneAndUpdate: sinon.stub().returns(P.reject('err'))
        };
        
        target = require(TEST_MODULE)(mongoose, PostSchema);
        return target.updatePost('12', { modifiedDateTime: new Date() })
            .catch(function(err) {
                should.exist(err);
            });
    });
});