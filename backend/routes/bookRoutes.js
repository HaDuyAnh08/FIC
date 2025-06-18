const express = require('express');
const router = express.Router();
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  searchBooks
} = require('../controllers/bookController');

// Base URL: /api/books
router.get('/', getBooks);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
// Route tìm kiếm theo tên + thể loại
router.get('/search', searchBooks);  // <-- mới thêm

module.exports = router;
