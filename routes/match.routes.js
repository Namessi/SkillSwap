const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');
const { verifyToken } = require('../middleware/authmiddleware'); 

router.post('/like', verifyToken, matchController.envoyerLike);
router.get('/suggestions', verifyToken, matchController.obtenirSuggestions);
router.get('/historique', verifyToken, matchController.historiqueMatchs);

module.exports = router;
