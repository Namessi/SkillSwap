// routes/suggestionIA.routes.js

const express = require('express');
const router = express.Router();
const suggestionIAController = require('../controllers/suggestionIA.controller');
const { verifyToken } = require('../middleware/authmiddleware');

/**
 * @route   GET /api/suggestionsIA
 * @desc    🔍 Obtenir des suggestions intelligentes personnalisées
 */
router.get('/', verifyToken, suggestionIAController.obtenirSuggestionsIA);

/**
 * @route   POST /api/suggestionsIA/ignorer
 * @desc    🚫 Ignorer une suggestion spécifique (ne plus la proposer)
 */
router.post('/ignorer', verifyToken, suggestionIAController.ignorerSuggestion);

module.exports = router;
