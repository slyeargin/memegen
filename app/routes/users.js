'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Meme = traceur.require(__dirname + '/../models/meme.js');


exports.register = (req, res)=> {
  User.register(req.body, u=> {
    if(u) {
      req.session.userId = u._id;
      res.redirect('/dashboard');
    } else {
      req.session.userId = null;
      res.redirect('/');
    }
  });
};

exports.dashboard = (req, res)=> {
  Meme.findByUserId(req.session.userId.toString(), memes=>{
    res.render('users/dashboard', {memes: memes, title: 'Dashboard'});
  });
};

exports.lookup = (req, res, next)=> {
  User.findById(req.session.userId, u=>{
    res.locals.user = u;
    next();
  });
};

exports.login = (req, res, next)=> {
  User.login(req.body, u=> {
    if(u) {
      req.session.userId = u._id;
      res.redirect('/dashboard');
    } else {
      req.session.userId = null;
      res.redirect('/');
    }
  });
};

exports.logout = (req, res)=> {
  req.session.userId = null;
  res.redirect('/');
};
