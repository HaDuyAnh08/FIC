const Book = require('../../models/Book');
// GET /api/books/:id – Lấy thông tin chi tiết 1 sách
module.exports = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};