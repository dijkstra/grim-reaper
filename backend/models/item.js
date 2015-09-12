var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ItemSchema = new Schema({
  sellerId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  // imageId: {
  //   type: String,
  //   required: true
  // },
  imageId: String,
  description: String,
  startTime: Date,
  endTime: {
    type: Date,
    required: true
  }
});

ItemSchema.statics.findBySellerId = function (id, cb) {
  return this.find({ sellerId: id }, cb);
}

module.exports = mongoose.model('Item', ItemSchema);

