// routes/defis.route.js

const express = require('express');
const router = express.Router();
const defisController = require('../controllers/defis.controller');
const { verifyToken } = require('../middleware/authmiddleware');

/**
 * @route   GET /api/defis
 * @desc    Récupérer tous les défis hebdomadaires disponibles
 */
router.get('/', verifyToken, defisController.getTousLesDefis);

/**
 * @route   GET /api/defis/valides
 * @desc    Récupérer les défis validés par l'utilisateur connecté
 */
router.get('/valides', verifyToken, defisController.getDefisValides);

/**
 * @route   POST /api/defis/:id/valider
 * @desc    Marquer un défi comme validé
 */
router.post('/:id/valider', verifyToken, defisController.validerDefi);

module.exports = router;
