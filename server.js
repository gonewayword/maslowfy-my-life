var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/maslowfy');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.listen(process.env.PORT || 4200);
console.log("Maslowfy listening on port 4200");

var Maslow = mongoose.model('Maslow', {
  text: String
});

app.get('/api/maslows', function(req, res){

  Maslow.find(function(err, maslow) {
    if(err){
      res.send(err);
    }

      res.json(maslow);
  })
});

app.post('/api/maslows', function(req, res){

  Maslow.create(
    {
    text: req.body.text,
    done: false
  },
  function(err, maslow){
    if(err){
      res.send(err);
    }
    Maslow.find(function(err, maslow){
      if(err){
        res.send(err);
      }
      res.json(maslow);
    })
  })
});

app.delete('/api/maslows/:maslow_id', function(req, res){

  Maslow.remove(
    {
      _id : req.params.maslow_id
    },
    function(err, maslow){
      if(err){
        res.send(err);
      }
      Maslow.find(function(err, maslow){
        if(err){
          res.send(err);
        }
        res.json(maslow);
      })
    }
  )
});

app.get('*', function(req, res) {
      res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
