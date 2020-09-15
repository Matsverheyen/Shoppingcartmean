var mongoose = require('mongoose');
var Schema = mongoose.Schema

var orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  items: [{
    itemId: Schema.Types.ObjectId,
    amount: Number
  }]
});

mongoose.model('Order', orderSchema);
