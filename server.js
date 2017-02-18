// Tells JavaScript that we want to use the package express and body-parser
var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017');

var Bear = require('./models/bear');
// calls express
var app = express();

// pulled in bodyParser through dependencies and uses it in app
app.use(bodyParser.urlencoded({extended: 'true'}));
app.use(bodyParser.json());

// middleware is what the request passes through before you manage the data
// easier to pull data

var port = process.env.PORT || 3000;

//wiring request to specific url
var router = express.Router();

// API url
router.get('/', function(req, res) {
  res.json({message: 'welcome'})
})

// pointing
// Instead of doing router.GET, PUT, POST, etc,
// POST request saves data to database - pass in data in json
router.route('/bears')
  .post(function(req, res){
    var bear = new Bear();
    bear.name = req.body.name;
    bear.save(function(err){
      // if there was an error, send it
      if (err)
        res.send(err);
      res.json({message: 'Bear was created!'});
    })
  })
  .get(function(req, res){
    Bear.find(function(err, bear){
      if(err)
        res.send(err);
      res.json(bear)
    })
  });
// Starts the app
app.use(router);
app.listen(port);
console.log('The server has started');
