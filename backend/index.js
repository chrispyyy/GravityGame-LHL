var express = require('express');
var app     = express();


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/level/:id', function( req, res) {
  mongoConnect(function(db){
    db.collection('levels').findOne({level:1},function(err,doc){
      res.json(doc).status(200);
      db.close();
    });
  });
});

app.post('/levels', function( req, res) {
  mongoConnect(function(db){
    console.log(req.params);
    db.close();
  });
});

var MongoClient = require('mongodb').MongoClient
  assert = require('assert');

var url = 'mongodb://localhost:27017/blackhole-run';

function mongoConnect(callback){
  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  callback(db);
  // db.close();
});
}




var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

