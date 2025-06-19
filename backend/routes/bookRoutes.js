const express = require('express');
const router = express.Router();
const {
  getBooks,
  createBook,
  getEconomicsBooks,
  getTechnologyBooks,
  getMediaBooks,
  getSelfHelpBooks,
  getChildrenBooks,
  getBookById
} = require('../controllers/bookController');

// Base URL: /api/books
router.get('/', getBooks);
router.post('/', createBook);
router.get('/economics', getEconomicsBooks);
router.get('/technology', getTechnologyBooks);
router.get('/media', getMediaBooks);
router.get('/selfhelp', getSelfHelpBooks);
router.get('/children', getChildrenBooks);
router.get('/:id', getBookById);
module.exports = router;
