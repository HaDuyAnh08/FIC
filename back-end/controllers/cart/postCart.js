const Cart = require('../../models/Cart');

// Thêm sách vào giỏ hàng
module.exports = async (req, res) => {
  const { userId, bookId, quantity = 1, rentalDays = 7 } = req.body;

  try {
    // Tìm giỏ hàng theo user
    let cart = await Cart.findOne({ userId });

    // Nếu chưa có giỏ, tạo mới
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ book: bookId, quantity, rentalDays }]
      });
    } else {
      // Kiểm tra xem sách đã có trong giỏ chưa
      const existingItem = cart.items.find(item => item.book.toString() === bookId);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.rentalDays = rentalDays; // Cập nhật số ngày thuê mới nhất
      } else {
        cart.items.push({ book: bookId, quantity, rentalDays });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
