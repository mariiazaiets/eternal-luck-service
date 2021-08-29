const express = require('express');
const router = express.Router();
const controller = require('../controllers/profile.controller');

router.get('/', controller.getUserData);
router.post('/change-profile-info', controller.changeUserData);

module.exports = router;
