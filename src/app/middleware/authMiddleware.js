const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');


const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    //check json web token is exits and is verified
    if(token) {
        jwt.verify(token, 'loyal secret', (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/account');
            }
            else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.redirect('/account');
    }
}

//check current user
const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, 'loyal secret', async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                let allItem = 0;
                let orderPending = await Order.findOne({'_user_id': decodedToken.id, '_status' : 'pending'});
                let orderDetails = await OrderDetail.find({'order': orderPending ? orderPending._id : 0});
                allItem = Object.keys(orderDetails).length;
                user = user.toObject();
                user.cart = allItem;
                user._order_id = orderPending ? orderPending._id : 0;
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser }