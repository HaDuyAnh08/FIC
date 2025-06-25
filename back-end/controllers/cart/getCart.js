const Cart = require('../../models/Cart');

// Lấy giỏ hàng của user từ token đã xác thực
module.exports = async (req, res) => {
  try {
    const userId = req.user._id; // 👉 Lấy từ token

    const cartItems = await Cart.findOne({ userId }).populate('items.book');

    if (!cartItems) {
      return res.status(404).json({ message: 'Giỏ hàng trống' });
    }

    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
