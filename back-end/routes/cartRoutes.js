const express = require('express');
const router = express.Router();

const getCart = require('../controllers/cart/getCart');
const postCart = require('../controllers/cart/postCart');
const verifyToken = require('../middleware/auth');

router.get('/cart', verifyToken, getCart);
router.post('/add', verifyToken, postCart);

module.exports = router;