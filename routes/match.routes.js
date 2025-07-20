// Importation d'Express et création d’un routeur
const express = require('express');
const router = express.Router();

// Importation du contrôleur qui gère les actions liées aux matchs (like, suggestions, historique, etc.)
const matchController = require('../controllers/match.controller');

// Importation de la fonction de vérification du token (middleware d'authentification)
const { verifyToken } = require('../middleware/authmiddleware'); 

// Route POST pour envoyer un like ou superlike à un autre utilisateur (authentification requise)
router.post('/like', verifyToken, matchController.envoyerLike);

// Route GET pour récupérer des suggestions de profils à matcher (authentification requise)
router.get('/suggestions', verifyToken, matchController.obtenirSuggestions);

// Route GET pour récupérer l'historique des matchs de l'utilisateur (authentification requise)
router.get('/historique', verifyToken, matchController.historiqueMatchs);

// ✅ Route GET pour proposer un profil aléatoire à découvrir (authentification requise)
router.get('/decouverte', verifyToken, matchController.decouverteAleatoire);

// Exportation du routeur pour l'intégrer dans l'application principale
module.exports = router;
