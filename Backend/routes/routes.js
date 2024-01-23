const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

// Login 
router.route('/login').post(userController.login);


module.exports = router;
