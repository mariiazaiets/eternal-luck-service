const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');

router.get('/', controller.getUsersData);
router.post('/friends', controller.addToFriends);
router.get('/friends', controller.getUserFriends);

module.exports = router;
