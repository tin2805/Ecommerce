const loginRouter = require('./account');
const homeRouter = require('./home');
const productRouter = require('./product');
const orderRouter = require('./order');
const { requireAuth, checkUser } = require('../app/middleware/authMiddleware');

function route(app) {
    app.use(checkUser);
 
    app.use('/order', requireAuth, orderRouter);

    app.use('/product', productRouter);

    app.use('/account', loginRouter);

    app.use('/home', homeRouter);

}

module.exports = route;
