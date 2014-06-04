/* jshint unused:false */

'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var multiparty = require('multiparty');
var fs = require('fs');

exports.confirmation = (req, res)=>{
  User.findByUserId(req.session.userId, user=>{
    res.render('home/navigation', {user:user, title:'MemeGen'});
  });
};

exports.register = (req, res)=>{
  var form = new multiparty.Form();

  form.parse(req, (err)=>{

    var user = new User();
    // var filePath = files.image[0].path;
    // var fileName = files.image[0].originalFilename;
    user.register(u=>{
      if(u){
        req.session.userId = u._id;
        res.redirect('/confirmation');
      }else{
        req.session.userId = null; //message - account already exists
        res.redirect('/');
      }
    });
  });
};

exports.login = (req, res)=>{
  User.findByUserEmail(req.body.email, user=>{
    if(user){
      user.login(req.body, u=>{
        if(u){
          req.session.userId = u._id;
          res.redirect('/confirmation');
        }else{
          req.session.userId = null; //message - incorrect password
          res.redirect('/');
        }
      });
    }else{
      res.redirect('/'); //message - no account. please register
    }
  });
};

// exports.dashboard = (req, res)=>{
//   User.findByUserId(req.params.userId, user=>res.render('users/dashboard', {user:user}));
// };
