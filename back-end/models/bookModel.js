const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  author: { type: String, required: true },
  yearPublished: { type: Number, required: true },
  rentalPrice: { type: Number, required: true },
  stockStatus: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Book', bookSchema);
