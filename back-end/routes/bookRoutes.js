const express = require('express');
const router = express.Router();
const { getBooks, getBookById, getBooksByGenre } = require('../controllers/bookController');

router.get('/', getBooks);
router.get('/:id', getBookById);
router.get('/genre/:genre', getBooksByGenre);

module.exports = router;