const jwt = require('jsonwebtoken');
const User = require('../models/User');
const responseNotification = require('../notifications/responseNotification');

//check current user
const checkAdmin = async (req, res, next) => {
    const token = req.cookies.jwt;
    var notification = responseNotification.response('error', 'Permission Denied', 'user');
    if(token) {
        jwt.verify(token, 'loyal secret', async (err, decodedToken) => {
            let user = await User.findById(decodedToken.id);
            user = user.toObject();
            if(user.role !== "admin"){
                let backURL = '' || '/home';
                req.flash('notification', notification);
                res.redirect(backURL);
            }
            next();
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}


module.exports = { checkAdmin }