/**
 * Created by in134bel on 29-1-2015.
 */
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
// you change this MongoDB configuration
var dbUrl = "mongodb://localhost:27017/office";


var database = module.exports = function(){
    console.log('database was instanced');
}

// get all data
database.prototype.getAll = function(callback){
    mongo.connect(dbUrl, function(err, db) {
        if(!err) {
            db.collection('contacts',function(err,coll){
                coll.find().toArray(function(err, items) {
                    db.close();
                    callback(null,items);
                });
            });
        }else{
            db.close();
            callback(err,null);
        }
    });
}

// save
database.prototype.save = function(contact,callback){
    mongo.connect(dbUrl, function(err, db) {
        if(!err) {
            db.collection('contacts',function(err,coll){
                if(contact._id) {
                    // update contact
                    coll.update({_id:ObjectID(contact._id)},
                        {$set:{name:contact.name,email:contact.email,phone:contact.phone}},
                        function(err,numberUpdated){
                            db.close();
                            if(numberUpdated>0){
                                callback(1);
                            }else{
                                callback(-1,err);
                            }
                        });
                }else{
                    // insert new contact
                    coll.insert(contact,function(err){
                        db.close();
                        if(!err){
                            callback(1);
                        }else{
                            callback(-1,err);
                        }
                    });
                }
            });
        }else{
            callback(-1,err);
        }
    });
}

// delete
database.prototype.delete = function(id,callback){
    mongo.connect(dbUrl, function(err, db) {
        if(!err) {
            db.collection('contacts',function(err,coll){
                coll.findAndRemove({_id:ObjectID(id)}, function(err,doc) {
                    db.close();
                    if(doc){
                        callback(1);
                    }else{
                        callback(-1,err);
                    }
                });
            });
        }else{
            callback(-1,err);
        }
    });
}
