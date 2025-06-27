// models/Order.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  book       : { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity   : { type: Number, default: 1 },
  rentalDays : { type: Number, default: 7 },
  price      : { type: Number, required: true },

  // các mốc áp dụng riêng cho từng lần thuê
  rentedAt   : { type: Date, default: Date.now },
  returnDate : { type: Date },
  status     : { type: String, enum: ['active', 'returned'], default: 'active' }
});

const orderSchema = new mongoose.Schema({
  userId      : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items       : [orderItemSchema],
  totalAmount : { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
