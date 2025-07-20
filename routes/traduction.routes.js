const express = require('express');
const router = express.Router();
const traductionController = require('../controllers/traduction.controller');
const { verifyToken, isAdmin } = require('../middleware/authmiddleware');

/**
 * 🔍 Récupérer une traduction par clé et langue
 * @route   GET /api/traductions/:cle/:langue
 */
router.get('/:cle/:langue', verifyToken, traductionController.getTraduction);

/**
 * ➕ Ajouter ou mettre à jour une traduction
 * @route   POST /api/traductions
 * @access  Admin
 */
router.post('/', verifyToken, isAdmin, traductionController.ajouterOuMettreAJour);

/**
 * 📚 Obtenir toutes les traductions d’une clé
 * @route   GET /api/traductions/:cle
 */
router.get('/:cle', verifyToken, traductionController.getToutesLanguesParCle);

/**
 * ❌ Supprimer une traduction spécifique
 * @route   DELETE /api/traductions/:cle/:langue
 * @access  Admin
 */
router.delete('/:cle/:langue', verifyToken, isAdmin, traductionController.supprimerTraduction);

/**
 * 📋 Lister toutes les traductions
 * @route   GET /api/traductions
 */
router.get('/', verifyToken, traductionController.listerToutesLesTraductions);

module.exports = router;
