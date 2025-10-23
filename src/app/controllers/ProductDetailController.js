class ProductDetailController {
    index (req, res) {
        return res.render('product_detail');
    }
}

module.exports = new ProductDetailController;