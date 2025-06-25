const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const Book = require('../../models/Book');
const { sendMail } = require('../helpers/sendMail');

module.exports = async (req, res) => {
  try {
    const userId = req.user._id;
    const email = req.user.email;
    const name = req.user.name;

    const cart = await Cart.findOne({ userId }).populate('items.book');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Giỏ hàng trống' });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const { book, quantity, rentalDays } = item;

      if (book.stock < quantity) {
        return res.status(400).json({ message: `Sách "${book.name}" không đủ trong kho.` });
      }

      book.stock -= quantity;
      await book.save();

      const price = book.rentalPrice * quantity;
      totalAmount += price;

      orderItems.push({
        book: book._id,
        quantity,
        rentalDays,
        price,
      });
    }

    const rentedAt = new Date();
    const maxRentalDays = Math.max(...orderItems.map(i => i.rentalDays));
    const returnDate = new Date(rentedAt.getTime() + maxRentalDays * 24 * 60 * 60 * 1000);

    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount,
      rentedAt,
      returnDate,
      status: 'pending',
    });

    await newOrder.save();

    const rentDateStr = rentedAt.toLocaleDateString('vi-VN');
    const returnDateStr = returnDate.toLocaleDateString('vi-VN');

    const html = `
      <h2>📚 Thông tin đơn thuê sách</h2>
      ${cart.items.map(item => `
        <p><strong>Tên sách:</strong> ${item.book.name}</p>
        <p><strong>Tác giả:</strong> ${item.book.author}</p>
        <p><strong>Giá thuê:</strong> ${item.book.rentalPrice}đ</p>
        <p><strong>Số lượng:</strong> ${item.quantity}</p>
        <p><strong>Thời gian thuê:</strong> ${item.rentalDays} ngày</p>
        <hr/>
      `).join('')}
      <p><strong>Tổng tiền:</strong> ${totalAmount}đ</p>
      <p><strong>Ngày thuê:</strong> ${rentDateStr}</p>
      <p><strong>Ngày trả dự kiến:</strong> ${returnDateStr}</p>
      <p>📬 Cảm ơn ${name} đã sử dụng dịch vụ tại LIBERO!</p>
    `;

    await sendMail(email, "Xác nhận đơn thuê sách", `Dear ${name}, cảm ơn bạn đã đặt sách`, html);
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ message: 'Đặt thuê sách thành công', order: newOrder });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
