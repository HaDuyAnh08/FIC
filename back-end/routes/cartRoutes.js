const express = require('express');
const router = express.Router();

const getCart = require('../controllers/cart/getCart')
const postCart = require('../controllers/cart/postCart')
const deleteCart = require('../controllers/cart/deleteCart')

router.get('/cart/:userId', getCart);
router.post('/add', postCart);
router.delete('/item/:id', deleteCart);

module.exports = router;