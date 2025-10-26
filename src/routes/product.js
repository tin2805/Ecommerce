const express = require('express')
const router = express.Router();
const adminRouter = express.Router();
const productsController = require('../app/controllers/ProductsController');
const {checkAdmin} = require('../app/middleware/adminMiddleware');

router.post('/update/:id', checkAdmin, productsController.update);
router.get('/edit/:id', checkAdmin, productsController.edit);
router.get('/create', checkAdmin, productsController.create);
router.post('/insert', checkAdmin, productsController.insert);
router.get('/detail/:id', productsController.detail);
router.get('/', productsController.index);

module.exports = router;
