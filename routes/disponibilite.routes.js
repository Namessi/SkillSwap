// Importation d'Express et création d’un routeur
const express = require('express');
const router = express.Router();

// Importation du contrôleur des disponibilités
const dispoController = require('../controllers/disponibilite.controller');

// Importation du middleware d'authentification
const auth = require('../middleware/authmiddleware');

// Route POST pour enregistrer les disponibilités de l'utilisateur connecté (authentification requise)
router.post('/set', auth.verifyToken, dispoController.enregistrerDisponibilites);

// Route GET pour récupérer les disponibilités de l'utilisateur connecté (authentification requise)
router.get('/me', auth.verifyToken, dispoController.recupererDisponibilites);

// Exportation du routeur pour utilisation dans l'application principale
module.exports = router;
