// Importation d'Express et création d’un routeur
const express = require('express');
const router = express.Router();

// Importation du contrôleur qui gère les routes publiques (accessibles sans authentification)
const publicController = require('../controllers/public.controller');

// Route GET pour récupérer la liste publique des compétences
router.get('/competences', publicController.competences);

// Route GET pour récupérer la liste des tutoriels publics
router.get('/tutoriels', publicController.tutoriels);

// Route GET pour récupérer les statistiques globales de l'application
router.get('/stats', publicController.stats);

// Route GET pour récupérer les profils publics visibles par tous
router.get('/profils', publicController.profils);

// Exportation du routeur pour l'intégrer dans l'application principale
module.exports = router;
