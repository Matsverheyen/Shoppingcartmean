var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

mongoose.model('Item', itemSchema);
