const express = require('express')
const router = express.Router();
const productsController = require('../app/controllers/ProductsController');

router.get('/create', productsController.create);
router.get('/detail/:id', productsController.detail);
router.get('/', productsController.index);
router.post('/insert', productsController.insert);


module.exports = router;
