const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBooksByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const books = await Book.find({ genre });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};