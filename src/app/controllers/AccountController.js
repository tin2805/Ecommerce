const User = require('../models/User');

const bcrypt = require('bcrypt');

const responseNotification = require('../notifications/responseNotification');

const jwt = require('jsonwebtoken');

class AccountController {
    index (req, res) {
        var notification = req.flash('notification');
        notification = notification ? notification[0] : notification;
        return res.render('account', {notification});
    }

    async login(req, res) {
        const formData = req.body;
        const user = await User.findOne({username: formData.username});
        var auth = false;
        var notification = responseNotification.response('error', 'Invalid username or password', 'login')

        if(user) {
            auth = bcrypt.compareSync(formData.password, user.password)
            if(auth) {
                const token = creatToken(user._id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
                notification.type = 'success';
                notification.text = 'Login success';
            }
        }
        req.flash('notification', notification);
        auth ? res.redirect('/home') : res.redirect('/account');
        
        // res.render('account', {error})
    }

    async register (req, res) {
        const formData = req.body;
        var notification = responseNotification.response('success', 'Register success', 'register')

        const username = await User.findOne({username: formData.username});
        const email = username ? true : await User.findOne({email: formData.email});
        if(email){
            notification.type = 'error';
            notification.text = 'Email or username already in use';
            req.flash('notification', notification);
            res.redirect('/account');
        }
        formData.password = bcrypt.hashSync(formData.password, 10);
        formData.role = 'user';
        const newUser = new User(formData)
        const token = creatToken(user._id);
        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        // req.flash('notification', notification);
        newUser.save()
            .then(() => res.redirect('/home'))
            .catch(error => {
                
            });
    }
    
    logout(req, res) {
        res.cookie('jwt', '', {maxAge: 1});
        res.redirect('/home');
    }

}
const maxAge = 3*24*60*60;
const creatToken = (id) => {
    return jwt.sign({id}, 'loyal secret', {
        expiresIn: maxAge
    });
};

module.exports = new AccountController;