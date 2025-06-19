const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, default: '' },
  author: { type: String, default: '' },
  yearPublished: { type: Number },
  rentalPrice: { type: Number, default: 0 },
  stockStatus: { type: String, enum: ['in stock', 'out of stock'], default: 'in stock' },
  image: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);