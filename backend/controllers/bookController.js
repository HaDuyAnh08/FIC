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


exports.getEconomicsBooks = async (req, res) => {
  try {
    const books = await Book.find({ genre: 'Kinh tế' });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTechnologyBooks = async (req, res) => {
  try {
    const books = await Book.find({ genre: 'Công nghệ' });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMediaBooks = async (req, res) => {
  try {
    const books = await Book.find({ genre: 'Truyền thông' });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSelfHelpBooks = async (req, res) => {
  try {
    const books = await Book.find({ genre: 'Self-Help' });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getChildrenBooks = async (req, res) => {
  try {
    const books = await Book.find({ genre: 'Thiếu nhi' });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/books/:id – Lấy thông tin chi tiết 1 sách
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


