'use strict';

var request = require('request');

exports.index = (req, res)=>{
  res.render('home/index', {title: 'Node.js: Home'});
};

exports.memes = (req, res)=>{
  request('https://api.imgflip.com/get_memes', function (error, response, body) {
    res.send(body);
  });
};
