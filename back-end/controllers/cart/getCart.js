const Cart = require('../../models/Cart');

// Lấy giỏ hàng của user theo userId
module.exports = async (req, res) => {
  const { userId } = req.params;
  try {
    const cartItems = await Cart.findOne({ userId }).populate('items.book');
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};