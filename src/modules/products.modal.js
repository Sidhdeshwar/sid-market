const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: String,
  description: String,
  images: Array,
  price: Number,
  _org: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'org',
  },
  _seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
});

const productsModal = mongoose.model('products', productsSchema);

module.exports = productsModal;
