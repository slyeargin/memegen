'use strict';

var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var _ = require('lodash');
var bcrypt = require('bcrypt');

class User{
  static register(obj, fn){
    users.findOne({email:obj.email}, (e,u)=>{
      if(!u){
        var user = new User();
        user.email = obj.email;
        user.password = bcrypt.hashSync(obj.password, 8);
        users.save(user, ()=>fn(user));
      }else{
        fn(null);
      }
    });
  }

  static login(obj, fn){
    users.findOne({email:obj.email}, (e,u)=>{
      if(u){
        var isMatch = bcrypt.compareSync(obj.password, u.password);
        if(isMatch){
          fn(u);
        }else{
          fn(null);
        }
      }else{
        fn(null);
      }
    });
  }
  //
  // save(fn){
  //   users.save(this, ( )=>{
  //     fn();
  //   });
  // }

  static findByUserEmail(email, fn){
    users.findOne({email:email}, (err, user)=>{
      user = _.create(User.prototype, user);
      fn(user);
    });
  }

  static findByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (err, user)=>{
        user = _.create(User.prototype, user);
        fn(user);
    });
  }

}

module.exports = User; //exporting Class out
