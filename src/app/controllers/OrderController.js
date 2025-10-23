const Order = require('../models/Order');
const Product = require('../models/Product');
const OrderDetail = require('../models/OrderDetail');
const responseNotification = require('../notifications/responseNotification');
const uploadFile = require('../middleware/uploadFile');
const path = require('path');
const { mutipleMongooseToObject, mongooseToObject } = require('../../helpers/mongoose');
const math = require('mathjs');
const { response } = require('express');

class OrderController {
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

    detail (req, res) {
        return res.render('product_detail');
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

    async cart(req, res, next) {
        const user = res.locals.user;
        let orderDetails = OrderDetail.find({'_order_id': user._order_id}).populate('product');
        let order = Order.findById(user._order_id);
        await Promise.all([orderDetails, order]).then(value => {
            [orderDetails, order] = value;
            orderDetails = mutipleMongooseToObject(orderDetails)
            order = mongooseToObject(order)
            res.render('cart', {orderDetails, order})
        })

        // orderDetails.then(orderDetails => {
        //             res.render('cart', { 
        //                 orderDetails: mutipleMongooseToObject(orderDetails)
        //             })
        //         })
        //         .catch(next);
    }

    async addToCart(req, res) {
        const formData = req.body;
        const user = res.locals.user;
        let existOder =  Order.findOne({'_user_id': user._id, '_status': 'pending'});
        let product =  Product.findById(formData._product_id);
        await Promise.all([existOder, product]).then(value => {
            [existOder, product] = value
        })
        const qty = Number(formData._qty)
        formData._price = product._price * qty;
        var notification = responseNotification.response('success', 'Add cart success', 'cart');

        if(existOder){
            console.log('aaaa')
            const existOderDetail = await OrderDetail.findOne({'_order_id': existOder._id, '_product_id': formData._product_id, '_size': formData._size});
            formData._order_id = existOder._id;
            formData.product = formData._product_id;
            const newOrderDetail = new OrderDetail(formData);
            existOder._price += formData._price;

            try {
                if(existOderDetail) {
                    existOderDetail._price += formData._price;
                    existOderDetail._qty += qty;
                    await existOderDetail.save();
                }
                else {
                    await newOrderDetail.save().then(order => {
                        console.log(order);
                    }
                        
                    );
                }
                await existOder.save()
            }
            catch(error) {
                console.log(error);
                notification.type = 'error';
                notification.text = 'Update order fail';
            }
            
            // newOrderDetail.save(formData).then(() =>
            //     existOder.save()
            //     .then(() => 
            //         req.flash('notification', notification))
            //     .catch(error => {
            //         console.log(error);
            //         notification.type = 'error';
            //         notification.text = 'Update order fail';
            //     })
            // )
            // .catch(
            //     error => {
            //         console.log(error);
            //         notification.type = 'error';
            //         notification.text = 'Add to cart fail';
            //     }
            // )

            req.flash('notification', notification);
            res.redirect('/product/detail/'+ formData._product_id)
        }
        else{
            const newOrder = new Order;
            const newOrderDetail = new OrderDetail(formData);
            console.log('bbbb')
            
            newOrder._user_id = user._id;
            newOrder._price = formData._price;
            newOrder._status = 'pending';
            newOrder._type = '';
            try {
                await newOrder.save().then(async order => {
                    newOrderDetail._order_id = order._id,
                    newOrderDetail.product = formData._product_id
                    await newOrderDetail.save()
                })

            }
            catch(error) {
                console.log(error);
                notification.type = 'error';
                notification.text = 'Add to cart fail';
            }
            // newOrder.save().then(order => {
            //     newOrderDetail._order_id = order._id
            //     newOrderDetail.save()
            //     .then(() => 
            //         req.flash('notification', notification))
            //     .catch(error => {
            //         console.log(error);
            //         notification.type = 'error';
            //         notification.text = 'Add to cart fail';
            //     })
            // })
            // .catch(
            //     error => {
            //         console.log(error);
            //         notification.type = 'error';
            //         notification.text = 'Create order fail';
            //     }
            // )

            req.flash('notification', notification);
            res.redirect('/product/detail/'+ formData._product_id)
        }
    }

    async updateCart(req, res, next) {
        const id = req.body._id;
        const order_id = res.locals.user._order_id;
        const type = req.body._type;
        const value = req.body._value;

        try {
            const order = await Order.findById(order_id);
            const item = await OrderDetail.findById(id).populate('product');
            if(type == 'remove' || value == 0) {
                await item.deleteOne();
            }
            else {
                item._qty = value;
                item._price = item.product._price * value;
                await item.save();
            }
            const orderDetails = await OrderDetail.find({'_order_id': order_id})
            console.log(orderDetails)
            console.log(Object.keys(orderDetails).length)
            let total = 0;
            if(Object.keys(orderDetails).length == 0) {
                await order.deleteOne();
            }
            else{
                orderDetails.map(orderDetails => {
                    total += orderDetails._price;
                }) 

                order._price = total
                await order.save()
            }
            const response = {
                type: type,
                item_total: item._price,
                total: total
            }
            res.send(response);

        } catch (error) {
            console.log(error)            
            res.json({message: 'error', status: 400, error: error});
        }
        
    }

    async confirmOrder(req, res, next) {
        const user = res.locals.user;
        const order = await Order.findById(user._order_id);
        const notification = responseNotification.response('success', 'Order success', 'order');
        order._status = 'ordered';
        order.save();
        req.flash('notification', notification);
        res.redirect('/home')

    }
}


module.exports = new OrderController;
