const Book = require('../../models/Book');

module.exports  = async (req, res) => {
  try {
    const books = await Book.find({ genre: 'Công nghệ' });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
