const Book = require('../../models/Book');

// GET /api/books - Lấy danh sách tất cả sách
module.exports  = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
