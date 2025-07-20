// Importation d'Express et création d’un routeur
const express = require('express');
const router = express.Router();

// Importation du contrôleur qui gère les fonctionnalités liées à la carte
const carteController = require('../controllers/carte.controller');

// Importation de la fonction de vérification du token (middleware d'authentification)
const { verifyToken } = require('../middleware/authmiddleware'); 

// Route GET pour récupérer les profils d'utilisateurs à proximité sur la carte (authentification requise)
router.get('/profils', verifyToken, carteController.profilsSurCarte); 

// Exportation du routeur pour intégration dans l'application principale
module.exports = router;
