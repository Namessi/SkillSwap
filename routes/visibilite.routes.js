// Importation d'Express et création d’un routeur
const express = require('express');
const router = express.Router();

// Importation du contrôleur qui gère la visibilité des profils utilisateurs
const visibiliteController = require('../controllers/visibilite.controller');

// Importation du middleware d'authentification
const auth = require('../middleware/authmiddleware');

// Route GET pour récupérer l'état actuel de visibilité du profil (authentification requise)
router.get('/', auth.verifyToken, visibiliteController.recupererEtat);

// Route POST pour modifier l'état de visibilité du profil (authentification requise)
router.post('/modifier', auth.verifyToken, visibiliteController.modifierEtat);

// Exportation du routeur pour l'intégrer dans l'application principale
module.exports = router;
