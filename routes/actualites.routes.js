// routes/actualites.routes.js

const express = require('express');
const router = express.Router();
const actualitesController = require('../controllers/actualites.controller');
const { verifyToken, isAdmin } = require('../middleware/authmiddleware');

/**
 * @route   GET /api/actualites
 * @desc    Récupérer les actualités personnalisées pour l’utilisateur connecté
 */
router.get('/', verifyToken, actualitesController.getFluxActualites);

/**
 * @route   POST /api/actualites
 * @desc    Ajouter une nouvelle actualité (réservé admin)
 */
router.post('/', verifyToken, isAdmin, actualitesController.ajouterActualite);

/**
 * @route   DELETE /api/actualites/:id
 * @desc    Supprimer une actualité (réservé admin)
 */
router.delete('/:id', verifyToken, isAdmin, actualitesController.supprimerActualite);

module.exports = router;
