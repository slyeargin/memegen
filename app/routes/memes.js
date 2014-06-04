/*jshint unused:false*/

'use strict';

var traceur = require('traceur');
var Meme = traceur.require(__dirname + '/../models/meme.js');

exports.create = (req, res)=>{
  Meme.create(req.session.userId, req.body, meme=>{
    res.send(meme);
  });
};

exports.show = (req, res)=>{
  Meme.findById(req.params.id, meme=>{
    res.render('memes/show', {meme:meme});
  });
};
