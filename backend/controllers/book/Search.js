const Book = require('../../models/Book');

module.exports = async (req, res) => {
  try {
    const { name, author, genre, language, course } = req.query;

    const filter = {};

    if (name) filter.name = new RegExp(name, 'i');
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = new RegExp(genre, 'i');
    if (language) filter.language = new RegExp(language, 'i');
    if (course) filter.course = new RegExp(course, 'i');

    const books = await Book.find(filter);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi tìm kiếm', error });
  }
};
