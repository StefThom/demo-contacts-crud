/**
 * Created by in134bel on 29-1-2015.
 */
var express = require('express');
var database = require('./database');
var db = new database();
var app = express();


app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


app.get('/contact/getall', function(req, res) {
    db.getAll(function(err,data){
        if(!err) {
            res.json(data);
        }
    });

});
app.post('/contact/save', function(req, res) {
    db.save(req.body,function(err){
        res.json(err);
    });

});

app.post('/contact/delete', function(req, res) {
    db.delete(req.body.id,function(err){
        res.json(err);
    });

});


app.listen(8070);
console.log('Server was started');