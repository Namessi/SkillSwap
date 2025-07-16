const express = require('express');
const router = express.Router();
const localisationController = require('../controllers/localisation.controller');
const auth = require('../middleware/authmiddleware'); 

// 🔐 Toutes les routes nécessitent que l’utilisateur soit connecté
router.post('/update', auth.verifyToken, localisationController.mettreAJourLocalisation);
router.get('/me', auth.verifyToken, localisationController.recupererLocalisation);
router.get('/proches', auth.verifyToken, localisationController.utilisateursProches);

module.exports = router;
