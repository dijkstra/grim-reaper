// call the packages we need
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var multiparty = require('multiparty');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shit');
var conn       = mongoose.connection;
var Grid       = require('gridfs-stream');
Grid.mongo     = mongoose.mongo;
var gfs;

conn.once('open', function () {
    console.log('open');
    gfs = Grid(conn.db);
});

var fs = require('fs');

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
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
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
  item.title = req.body.title;
  item.sellerId = req.body.sellerId;
  item.amount = req.body.amount;
  item.price = req.body.price;
  item.endTime = req.body.endTime;

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


// STORE IMAGE
router.route('/images')
.post(function(req, res) {

  console.log(req.body);
  console.log('image upload');

  var form = new multiparty.Form();

  form.parse(req, function(err, fields, files) {
    
    console.log(fields);
    console.log(files);  //Remember: this assumes the files contains a property called "image"
    if (files.image.length > 0) {

      var file = files.image[0];
      console.log(file.originalFilename);
      console.log(file.path);
      console.log(file.headers['content-type']);

      var writestream = gfs.createWriteStream({
        filename: file.originalFilename
      });
      fs.createReadStream(file.path).pipe(writestream);
   
      writestream.on('close', function (savedfile) {
          // do something with `file`
          console.log(savedfile.filename + 'Written To DB');
          console.log(savedfile);

          res.json({
            fileId: savedfile['_id']
          });
      });

    } else {
      throw new Error('No files received');
    }

  });

});


app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

process.on('uncaughtException', function (err) {
  console.log('\n\nKaboom!');
  console.log(err);
});






