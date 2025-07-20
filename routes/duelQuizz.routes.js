// routes/duelQuizz.route.js

const express = require('express');
const router = express.Router();
const duelController = require('../controllers/duelQuizz.controller');
const { verifyToken } = require('../middleware/authmiddleware'); // Vérifie l'authentification JWT

/**
 * @route   POST /api/duels
 * @desc    Créer un nouveau duel de quiz
 */
router.post('/', verifyToken, duelController.creerDuel);

/**
 * @route   POST /api/duels/repondre
 * @desc    Répondre à un duel de quiz
 */
router.post('/repondre', verifyToken, duelController.repondreDuel);

/**
 * @route   GET /api/duels
 * @desc    Récupérer tous les duels de l'utilisateur connecté
 */
router.get('/', verifyToken, duelController.getDuelsUtilisateur);

module.exports = router;
