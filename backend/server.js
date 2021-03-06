// call the packages we need
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var mime       = require('mime');
var conf       = require('./conf')
var $q          = require('q');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shit');
var conn       = mongoose.connection;
var Grid       = require('gridfs-stream');
Grid.mongo     = mongoose.mongo;
var gfs;

var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "wzzgntxq9gzxhbdq",
  publicKey: "whhr3nv3txnfpk7p",
  privateKey: "bf4a192368e60c1b3543e9a7b8d3f34b"
});

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



function transformImageUrl(item) {
  if (item.imageId) {
    item.imageId = 'http://' + conf.IMAGEBASE + '/api/images/' + item.imageId
  }
}


// Cover-all middleware
router.use(function(req, res, next) {
  console.log('\n\n############');
  console.log(req.originalUrl);
  console.log(req.body);



  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'content-type');

  next();
});


// APIs
// #############################
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// PAYMENT AND SO ON!
router.route('/client_token')
.get(function(req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});

function makeTransaction(transaction) {

  var deferred = $q.defer();

  gateway.transaction.sale({
    amount: transaction.quantity,
    paymentMethodNonce: transaction.payment_method_nonce
  }, function (err, result) {
    if (err)
      deferred.reject(err);
    deferred.resolve(result);
  });

  return deferred.promise;
}

function updateItemById(id, fields) {
  var deferred = $q.defer();
  Item.update({_id: id}, fields, function(err) {
    if (err)
      deferred.reject(err);
    deferred.resolve();
  });
  return deferred.promise;
}

function reductQuanitity(itemData) {

  console.log('reductQuanitity');
  console.log(itemData);

  var deferred = $q.defer();
  Item.findById(itemData.id, function(err, item) {
    if (err) {
      throw err;
    } 
    if (!item) {
      res.status(404).send('Item not found');
      return;
    } else if (item.amount < itemData.quantity) {
      res.status(404).send('Out of stock');
      return;
    } 

    var newAmount = item.amount - itemData.quantity;
    updateItemById(item._id, { 'amount': newAmount })
      .then(deferred.resolve).fail(deferred.reject);
  });

  return deferred.promise;
}

router.route('/checkout')
// Collect
.post(function(req, res) {

  makeTransaction(req.body)
  .then(function () {
    return reductQuanitity(req.body);
  })
  .then(function() {
    res.redirect(req.body.redirectPage);
    // res.send();
  }).fail(res.send);

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
        res.send(err);
        // console.log(err);
      var currentTime = new Date();
      var filterdItems = items.filter(function(item) {
        return item.amount > 0;
      });
      filterdItems.forEach(function (item) {
        transformImageUrl(item);
      });

      res.json(filterdItems);
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
  item.imageId = req.body.imageId;
  item.startTime = new Date();

  item.save(function(err) {
    if (err)
      res.send(err);

    res.json(item);
  });
})
// LIST ALL ITEMS
.get(function(req, res) {

  Item.find(function(err, items) {
    if (err)
      res.send(err);

    items.forEach(function (item) {
      transformImageUrl(item);
    });

    res.json(items);
  });
});

// GET ITEM BY ID
router.route('/items/:id')
.get(function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (err)
      res.send(err);

    transformImageUrl(item);
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

// GET IMAGE
router.route('/images/:id')
.get(function(req, res) {

  console.log('get file');

  gfs.findOne({ _id: req.params.id }, function (err, file) {
    if (err) return res.status(400).send(err);
    if (!file) return res.status(404).send('');

    // res.set('Content-Type', mime(file.filename));

    var readstream = gfs.createReadStream({
      _id: file._id
    });

    readstream.on("error", function(err) {
      console.log("Got error while processing stream " + err.message);
      res.end();
    });

    readstream.pipe(res);
  });
});


app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

process.on('uncaughtException', function (err) {
  console.log('\n\nKaboom!');
  console.log(err);
});
















