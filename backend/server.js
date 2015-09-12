// call the packages we need
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shit');


// Models
// #############################
var Seller = require('./models/seller');
var Item = require('./models/item')

// #############################


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


var router = express.Router();

// Cover-all middleware
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});


// APIs
// #############################
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });   
});


router.route('/sellers')
// CREATE SELLER
.post(function(req, res) {

  var seller = new Seller();
  seller.name = req.body.name;
  seller.address = req.body.address;
  seller.description = req.body.description | '';

  seller.save(function(err) {
    if (err)
      res.send(err);

    res.json(seller);
  });
})

// GET ALL SELLERS
.get(function(req, res) {

  Seller.find(function(err, sellers) {
    if (err)
      res.send(err);

    res.json(sellers);
  });
});

// GET SELLER BY ID
router.route('/sellers/:id')
.get(function(req, res) {
  Seller.findById(req.params.id, function(err, seller) {
    if (err)
      res.send(err);
    res.json(seller);
  });
});

router.route('/sellers/:id/items')
.get(function (req, res) {

  Seller.findById(req.params.id, function(err, seller) {
    if (err)
      res.send(err);
    
    Item.findBySellerId(seller._id, function(err, items) {
      if (err)
        console.log(err);

      res.json(items);
    });
  });

});


router.route('/items')
// CREATE ITEM
.post(function(req, res) {

  var item = new Item();
  item.name = req.body.name;

  item.save(function(err) {
    if (err)
      res.send(err);

    res.json(item);
  });
})
.get(function(req, res) {

  Item.find(function(err, items) {
    if (err)
      res.send(err);

    res.json(items);
  });
});

// GET ITEM BY ID
router.route('/items/:id')
.get(function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (err)
      res.send(err);
    res.json(item);
  });
});


app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

process.on('uncaughtException', function (err) {
  console.log('\n\nKaboom!');
  console.log(err);
});






