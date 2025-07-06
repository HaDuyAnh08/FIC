// back-end/routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// ⬇️ import đúng đường dẫn mới
const {
  createBook,
  listBooks,
  deleteBook
} = require('../controllers/adminbook/adminBookController');

//  /api/admin/books
router.post('/books', auth, isAdmin, createBook);
router.get('/books', auth, isAdmin, listBooks);
router.delete('/books/:id', auth, isAdmin, deleteBook);

module.exports = router;