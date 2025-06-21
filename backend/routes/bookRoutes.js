const express = require('express');
const router = express.Router();

const getBooks = require('../controllers/book/getBooks');
const getBookById = require('../controllers/book/getBookById');
const getEconomicsBooks = require('../controllers/book/getEconomicsBooks');
const getTechnologyBooks = require('../controllers/book/getTechnologyBooks');
const getMediaBooks = require('../controllers/book/getMediaBooks');
const getSelfHelpBooks = require('../controllers/book/getSelfHelpBooks');
const getChildrenBooks = require('../controllers/book/getChildrenBooks');
const search = require('../controllers/book/Search');
// Base URL: /api/books
router.get('/', getBooks); // lấy tất cả sách
router.get('/economics', getEconomicsBooks); // lấy theo thể loại
router.get('/technology', getTechnologyBooks);
router.get('/media', getMediaBooks);
router.get('/selfhelp', getSelfHelpBooks);
router.get('/children', getChildrenBooks);
router.get('/search', search);

router.get('/:id', getBookById); // lấy thông tin sách

module.exports = router;
