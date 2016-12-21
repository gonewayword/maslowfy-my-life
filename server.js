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

var Users = new mongoose.Schema({
  username: String,
  password: String
})

var User = mongoose.model('User', Users);

var MaslowSchema = new mongoose.Schema({
  self: String,
  esteem: String,
  love: String,
  safety: String,
  physio: String
})

mongoose.model('Maslow', MaslowSchema);

var Maslow = mongoose.model('Maslow');

app.get('/api/maslows', function(req, res){

  Maslow.find(function(err, maslow) {
    if(err){
      res.send(err);
    }

      res.json(maslow);
  })
});

app.post('/api/maslows', function(req, res){
      //
      // var query = {
      //   self: req.body._id
      // };
      // var update = {
      //   self: req.body.self,
      //   esteem: req.body.esteem,
      //   love: req.body.love,
      //   safety: req.body.safety,
      //   physio: req.body.physio
      // };
      // var options = {
      //   // Return the document after updates are applied
      //   new: true,
      //   // Create a document if one isn't found. Required
      //   // for `setDefaultsOnInsert`
      //   upsert: true,
      //   setDefaultsOnInsert: true
      // };
      //
      // Maslow.
      //   findOneAndUpdate(query, update, options, function (error, doc) {
      //     if(error){
      //       console.log(error);
      //     }
      //     res.json(doc)
      //   });

    Maslow.create({
      self: req.body.self,
      esteem: req.body.esteem,
      love: req.body.love,
      safety: req.body.safety,
      physio: req.body.physio,
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


module.exports = Maslow;
module.exports = User;
