var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SellerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageId: String,
  description: String,
  address: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  credentials: {
    username: String,
    password: String
  }
});

module.exports = mongoose.model('Seller', SellerSchema);
