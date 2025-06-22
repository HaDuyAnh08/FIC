const Cart = require('../../models/Cart');

module.exports = async function removeFromCart(req, res) {
  const { id } = req.params;
  try {
    await Cart.findByIdAndDelete(id); // Đúng model: Cart
    res.json({ message: 'Removed from cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
