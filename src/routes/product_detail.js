const express = require('express')
const router = express.Router();

const productDetailController = require('../app/controllers/ProductDetailController');

router.use('/', productDetailController.index);

module.exports = router;
