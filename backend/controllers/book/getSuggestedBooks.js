const Book = require('../../models/Book');

module.exports = async (req, res) => {
  try {
    const { genre, currentBookId, limit = 4 } = req.query;
    if (!genre || !currentBookId) {
      return res.status(400).json({ error: 'Genre and currentBookId are required' });
    }

    const books = await Book.find({
      genre,
      _id: { $ne: currentBookId },
    }).limit(Number(limit));

    res.json(books);
  } catch (error) {
    console.error('Error fetching suggested books:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

