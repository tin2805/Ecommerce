const Product = require('../models/Product');
const responseNotification = require('../notifications/responseNotification');
const uploadFile = require('../middleware/uploadFile');
const path = require('path');
const { mutipleMongooseToObject } = require('../../helpers/mongoose');
const { mongooseToObject } = require('../../helpers/mongoose');


class ProductsController {

    index (req, res, next) {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 8; // Default to 10 items per page
        const skip = (page - 1) * limit;
        let products = Product.find({});
        const maxPage = products ? Math.round(Object.keys(products).length / limit) : 1;
        let indexPage = [];
        for(let i = 1; i <= maxPage; i++) {
            indexPage.push(i);
        }
        products.skip(skip).limit(limit)
            .then(products => {
                res.render('product', { 
                    products: mutipleMongooseToObject(products),
                    indexPage: indexPage
                })
            })
            .catch(next);
    }

    detail (req, res, next) {
        var product = Product.findById(req.params.id);
        var notification = req.flash('notification');
        notification = notification ? notification[0] : notification;
        product.then(
            product => {
                res.render('product_detail', {
                    product: mongooseToObject(product),
                    notification: notification
                })
            })
            .catch(next)
        
        // return res.render('product_detail', );
    }

    create(req, res) {
        var notification = req.flash('notification');
        notification = notification ? notification[0] : notification;
        return res.render('product_create', {notification});
    }

    insert(req, res) {
        const formData = req.body;
        var notification = responseNotification.response('success', 'Create product success', 'product');
        const upload = uploadFile.upload(req.files._img);
        formData._img = upload;
        const newProduct = new Product(formData);
        req.flash('notification', notification);
        newProduct.save()
            .then(() => res.redirect('/product/create'))
            .catch(error => {
                console.log(error);
        });
    }
}


module.exports = new ProductsController;
