// Importation d'Express et création d’un routeur
const express = require('express');
const router = express.Router();

// Importation du contrôleur qui gère les suggestions personnalisées
const suggestionController = require('../controllers/suggestions.controller');

// Importation du middleware d'authentification
const auth = require('../middleware/authmiddleware');

// Route GET pour récupérer les suggestions de l'utilisateur connecté (authentification requise)
router.get('/mes-suggestions', auth.verifyToken, suggestionController.recupererSuggestions);

// Exportation du routeur pour l'intégrer dans l'application principale
module.exports = router;
