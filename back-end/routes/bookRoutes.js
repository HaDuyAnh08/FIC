const express = require('express');
const router = express.Router();
const { getBooks, getBookById, getBooksByGenre, getSearch } = require('../controllers/bookController');

router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.get('/books/genre/:genre', getBooksByGenre);
router.get('/search', getSearch);

module.exports = router;