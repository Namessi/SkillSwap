// routes/gamification.routes.js

const express = require('express');
const router = express.Router();
const gamificationController = require('../controllers/gamification.controller');
const { verifyToken } = require('../middleware/authmiddleware');

/**
 * @route   GET /api/gamification/points
 * @desc    Récupérer les points et niveau de l’utilisateur connecté
 */
router.get('/points', verifyToken, gamificationController.getPoints);

/**
 * @route   POST /api/gamification/action
 * @desc    Enregistrer une action gamifiée (ex : aide, quiz, like...)
 */
router.post('/action', verifyToken, gamificationController.enregistrerAction);

/**
 * @route   GET /api/gamification/classement
 * @desc    Récupérer le classement des utilisateurs
 */
router.get('/classement', verifyToken, gamificationController.getClassement);

module.exports = router;
