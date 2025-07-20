// routes/recompenses.routes.js

const express = require('express');
const router = express.Router();
const recompensesController = require('../controllers/recompenses.controller');
const { verifyToken } = require('../middleware/authmiddleware');

/**
 * 📋 Récupérer toutes les récompenses disponibles
 * @route   GET /api/recompenses
 * @access  Authentifié
 */
router.get('/', verifyToken, recompensesController.getRecompensesDisponibles);

/**
 * 👤 Récupérer les récompenses obtenues par l'utilisateur connecté
 * @route   GET /api/recompenses/utilisateur
 * @access  Authentifié
 */
router.get('/utilisateur', verifyToken, recompensesController.getRecompensesUtilisateur);

/**
 * 🎁 Obtenir une récompense en échange de points
 * @route   POST /api/recompenses/obtenir
 * @access  Authentifié
 */
router.post('/obtenir', verifyToken, recompensesController.obtenirRecompense);

module.exports = router;
