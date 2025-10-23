const express = require('express')
const router = express.Router();
const orderController = require('../app/controllers/OrderController');

router.get('/cart/confirm', orderController.confirmOrder);
router.post('/cart/update', orderController.updateCart);
router.post('/cart/add', orderController.addToCart);
router.get('/cart', orderController.cart);
router.get('/create', orderController.create);
router.get('/detail/:id', orderController.detail);
router.get('/', orderController.index);
router.post('/insert', orderController.insert);


module.exports = router;
