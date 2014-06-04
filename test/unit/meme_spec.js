/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'meme-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var app = require('../../app/app');
var request = require('supertest');
var traceur = require('traceur');

var sue;
var meme1;
var Meme;
var User;

describe('Meme', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(){
      Meme = traceur.require(__dirname + '/../../app/models/meme.js');
      User = traceur.require(__dirname + '/../../app/models/user.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('users').drop(function(){
      global.nss.db.collection('memes').drop(function () {
        User.register({email:'sue@aol.com', password:'abcd'}, function(u){
          sue = u;
          Meme.create(sue._id.toString(), {name: 'test1', tag: 'One Does Not Simply', file: 'http://i.imgflip.com/1bij.jpg'}, function (meme) {
            meme1 = meme;
            done();
          })
        });
      })
    });
  });

  describe('.create', function () {
    it('should successfully create a meme', function (done) {
      Meme.create(sue._id.toString(), {name: 'test2', tag: 'One Does Not Simply', file: 'http://i.imgflip.com/1bij.jpg'}, function(meme){
          expect(meme).to.be.ok;
          expect(meme).to.be.an.instanceof(Meme);
          expect(meme.userId.toString()).to.equal(sue._id.toString());
          expect(meme.file).to.be.a('string');
          expect(meme.tag).to.be.a('string');
          expect(meme._id).to.be.an.instanceof(Mongo.ObjectID);
          done();
      });
    });
  });

  describe('.findById', function () {
    it('should return a meme with matching credentials', function (done) {
      Meme.findById(meme1._id, function (meme) {
        expect(meme).to.be.ok;
        expect(meme).to.be.instanceof(Meme);
        expect(meme.userId.toString()).to.equal(sue._id.toString());
        done();
      });
    });

    it('should return a null meme object', function (done) {
      Meme.findById('538de154065c89565f9bdf6c', function (meme) {
        expect(meme).to.be.null;
        done();
      });
    });
  });

  describe('.findByUserId', function () {
    it('should return a meme with matching userId', function (done) {
      Meme.findByUserId(sue._id.toString(), function (meme) {
        expect(meme).to.be.ok;
        expect(meme[0]).to.be.instanceof(Meme);
        expect(meme).to.be.an('array');
        expect(meme).to.have.length(1);
        expect(meme[0].userId.toString()).to.deep.equal(sue._id.toString());
        done();
      });
    });

    it('should return a null meme object', function (done) {
      Meme.findByUserId('538de154065c89565f9bde6c', function (meme) {
        expect(meme).to.be.null;
        done();
      });
    });
  });

  describe('#save', function () {
    it('should save the meme to the database', function (done) {
      meme1.save(function () {
        Meme.findById(meme1._id.toString(), function (meme) {
          expect(meme).to.be.ok;
          expect(meme._id.toString()).to.equal(meme1._id.toString());
          expect(meme.name).to.equal(meme1.name);
          expect(meme.userId.toString()).to.equal(meme1.userId.toString());
          expect(meme.tag).to.equal(meme1.tag);
          expect(meme.file).to.equal(meme1.file);
          done();
        });
      });
    });
  });

  describe('#nuke', function () {
    it('should delete the meme to the database', function (done) {
      meme1.nuke(function () {
        Meme.findById(meme1._id.toString(), function (meme) {
          expect(meme).to.be.null;
          done();
        });
      });
    });
  });

});
