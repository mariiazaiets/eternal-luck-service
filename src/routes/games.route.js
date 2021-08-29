const express = require('express');
const router = express.Router();
const controller = require('../controllers/games.controller');

router.get('/', controller.getGames);
router.post('/library', controller.addToLibrary);
router.get('/library', controller.getUserGames);

module.exports = router;
