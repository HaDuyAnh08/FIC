const Book = require('../models/Book');

// GET /api/books - Lấy danh sách tất cả sách
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/books - Thêm một quyển sách
exports.createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/books/:id - Cập nhật sách
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/books/:id - Xoá sách
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}  
// search follow name and genre :tìm theo tên + thể loại
exports.searchBooks = async (req, res) => {
  try {
    const { name, genre, page = 1, limit = 4, sortBy = 'createdAt', order = 'desc' } = req.query;

    const filter = {};
    if (genre) filter.genre = genre;
    if (name) filter.name = new RegExp(name, 'i');

    const sortOption = {};
    sortOption[sortBy] = order === 'asc' ? 1 : -1;

    const books = await Book.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      books,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


