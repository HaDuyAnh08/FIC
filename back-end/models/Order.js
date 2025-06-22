const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({ 
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  rentalDays: {
    type: Number,
    default: 7
  },
  price: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({    // người thuê
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  items: [orderItemSchema], // mảng sách thuê
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'returned', 'cancelled'],
    default: 'pending'
  },
  rentedAt: {
    type: Date,
    default: Date.now
  },
  returnDate: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
