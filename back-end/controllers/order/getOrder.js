// controllers/order/getOrders.js
const Order = require('../../models/Order');

module.exports = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ userId })
      .populate('items.book') // Lấy thông tin sách trong đơn
      .sort({ createdAt: -1 }); // Sắp xếp mới nhất trước  

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
