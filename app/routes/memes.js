'use strict';

var traceur = require('traceur');
var Meme = traceur.require(__dirname + '/../models/meme.js');

exports.show = (req, res)=>{
  Meme.findById(req.params.id, meme=>{
    res.render('memes/show', {meme:meme, title: 'Meme'});
  });
};

exports.create = (req, res)=>{
  console.log(req.body);
};
