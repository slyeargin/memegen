/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'meme-test';

// var expect = require('chai').expect;
// var Mongo = require('mongodb');
var app = require('../../app/app');
var request = require('supertest');
var traceur = require('traceur');

var User;
var sue;

describe('User', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(){
      User = traceur.require(__dirname + '/../../app/models/user.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('users').drop(function(){
      User.register({email:'sue@aol.com', password:'abcd'}, function(u){
        sue = u;
        done();
      });
    });
  });

  describe('Get /', function () {
    it('should render the home page', function (done) {
        request(app)
        .get('/')
        .expect(200, done);
    });
  });

});
