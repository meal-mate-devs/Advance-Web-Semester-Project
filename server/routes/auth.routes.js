const express = require('express');
const router = express.Router();

const {
    register,
    login,
    resetPassowrd,
} = require('../controllers/auth.controller');
const { validateRegistration, validateLogin } = require('../middlewares/validationMiddleware');

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/forget-passowrd', resetPassowrd);



module.exports = router;