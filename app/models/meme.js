var memeCollection = global.nss.db.collection('memes');
var Mongo = require('mongodb');
var _ = require('lodash');

class Meme{
  static create(userId, obj, fn){
    var meme = new Meme();
    meme.userId = Mongo.ObjectID(userId);
    meme.tag = obj.tag;
    meme.name = obj.name;
    meme.file = obj.file;
    meme.save(()=>fn(meme));
  }

  static findById(memeId, fn){
    memeId = Mongo.ObjectID(memeId);
    memeCollection.findOne({_id:memeId}, (e, m)=>{
      if(m){
        m = _.create(Meme.prototype, m);
        fn(m);
      }else{
        fn(null)
      }
    });
  }

  static findByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    memeCollection.find({userId: userId}).toArray((e, objs)=>{
      if(objs.length === 0){fn(null); return;}
      var memes = objs.map(o=>_.create(Meme.prototype, o));
      fn(memes);
    });
  }

  save(fn){
    memeCollection.save(this, ()=>fn());
  }

}

module.exports = Meme;
