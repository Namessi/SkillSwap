// Importation d'Express et création d’un routeur
const express = require('express');
const router = express.Router();

// Importation du contrôleur qui gère les localisations des utilisateurs
const localisationController = require('../controllers/localisation.controller');

// Importation du middleware d'authentification
const auth = require('../middleware/authmiddleware'); 

// 🔐 Toutes les routes nécessitent que l’utilisateur soit connecté

// Route POST pour mettre à jour la localisation de l'utilisateur connecté
router.post('/update', auth.verifyToken, localisationController.mettreAJourLocalisation);

// Route GET pour récupérer la localisation actuelle de l'utilisateur connecté
router.get('/me', auth.verifyToken, localisationController.recupererLocalisation);

// Route GET pour récupérer les utilisateurs proches de la localisation donnée
router.get('/proches', auth.verifyToken, localisationController.utilisateursProches);

// Exportation du routeur pour l'intégrer dans l'application principale
module.exports = router;
