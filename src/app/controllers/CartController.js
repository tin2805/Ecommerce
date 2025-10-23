class CartController {

    index (req, res) {
        return res.render('cart');
    }
}

module.exports = new CartController;
