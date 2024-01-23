const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

// Login 
router.route('/login').post(userController.login);

// Start HomeOffice-Zeit
router.route('/start').post(userController.startHomeOffice);

// Stop HomeOffice-Zeit
router.route('/stop').post(userController.stopHomeOffice);



module.exports = router;
