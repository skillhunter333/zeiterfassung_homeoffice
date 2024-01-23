const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Login 
router.route('/login').post(userController.login);

// Start HomeOffice-Zeit
router.route('/start').post(isAuthenticated, userController.startHomeOffice);

// Stop HomeOffice-Zeit
router.route('/stop').post(isAuthenticated, userController.stopHomeOffice);



module.exports = router;
