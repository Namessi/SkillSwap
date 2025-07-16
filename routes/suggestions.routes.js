const express = require('express');
const router = express.Router();
const suggestionController = require('../controllers/suggestions.controller');
const auth = require('../middleware/authmiddleware');

router.get('/mes-suggestions', auth.verifyToken, suggestionController.recupererSuggestions);

module.exports = router;
