const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Login 
router.route('/login').post(userController.login);

// Start HomeOffice-Zeit
router.route('/start').post(isAuthenticated, userController.startHomeOffice);

// Prüfung ob eine Arbeitszeit momentan läuft
router.route('/checkCurrentTracking').get(isAuthenticated, userController.checkCurrentTracking);

// Stop HomeOffice-Zeit
router.route('/stop').post(isAuthenticated, userController.stopHomeOffice);

// Arbeitszeiten-Übersicht
router.route('/overview').get(isAuthenticated, userController.getTimeOverview);

// User-Name
router.route('/username').get(isAuthenticated, userController.getUserName)



module.exports = router;
