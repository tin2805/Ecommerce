const express = require('express')
const router = express.Router();
const orderController = require('../app/controllers/OrderController');
const { checkAdmin } = require('../app/middleware/adminMiddleware');

router.post('/destroy/:id', checkAdmin, orderController.destroy);
router.post('/update/:id', checkAdmin, orderController.update);
router.get('/edit/:id', checkAdmin, orderController.edit);
router.get('/create', checkAdmin, orderController.create);
router.post('/insert', checkAdmin, orderController.insert);
router.get('/admin', checkAdmin, orderController.orderAdmin);
router.get('/cart/confirm', orderController.confirmOrder);
router.post('/cart/update', orderController.updateCart);
router.post('/cart/add', orderController.addToCart);
router.get('/cart', orderController.cart);
router.get('/create', orderController.create);
router.get('/detail/:id', orderController.detail);
router.get('/', orderController.index);
router.post('/insert', orderController.insert);


module.exports = router;
