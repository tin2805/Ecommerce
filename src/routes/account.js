const express = require('express')
const router = express.Router();

const accountController = require('../app/controllers/AccountController');

router.get('/info', accountController.info);
router.get('/logout', accountController.logout);
router.post('/login', accountController.login);
router.post('/register', accountController.register);
router.get('/', accountController.index);

module.exports = router;
