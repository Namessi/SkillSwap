const express = require('express');
const router = express.Router();
const abonnementsController = require('../controllers/abonnements.controller');
const auth = require('../middleware/authmiddleware'); // ✅ auth.verifyToken

// 📌 Création d’un abonnement pour l’utilisateur connecté
router.post('/', auth.verifyToken, abonnementsController.createAbonnement);

// 📌 Récupérer tous les abonnements de l’utilisateur
router.get('/', auth.verifyToken, abonnementsController.getAllAbonnements);

// 📌 Récupérer un abonnement spécifique (vérifie l’ID dans la DB)
router.get('/:id', auth.verifyToken, abonnementsController.getAbonnementById);

// 📌 Supprimer un abonnement (si résiliation, etc.)
router.delete('/:id', auth.verifyToken, abonnementsController.deleteAbonnement);

module.exports = router;
