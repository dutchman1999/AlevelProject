// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/adminRegister', adminController.register);
router.post('/adminLogin', adminController.login);

module.exports = router;