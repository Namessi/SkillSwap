const express = require('express');
const router = express.Router();
const tutorielsController = require('../controllers/tutoriels.controller');
const authMiddleware = require('../middleware/authmiddleware');

// 🔐 Toutes les routes nécessitent une authentification
router.use(authMiddleware.verifyToken);

/**
 * 📚 Récupérer tous les tutoriels
 * GET /api/tutoriels
 */
router.get('/', tutorielsController.getAllTutoriels);

/**
 * 🔍 Récupérer un tutoriel par ID
 * GET /api/tutoriels/:id
 */
router.get('/:id', tutorielsController.getTutorielById);

/**
 * ➕ Créer un nouveau tutoriel (admin uniquement)
 * POST /api/tutoriels
 */
router.post('/', authMiddleware.isAdmin, tutorielsController.createTutoriel);

/**
 * ✏️ Modifier un tutoriel existant (admin uniquement)
 * PUT /api/tutoriels/:id
 */
router.put('/:id', authMiddleware.isAdmin, tutorielsController.updateTutoriel);

/**
 * ❌ Supprimer un tutoriel (admin uniquement)
 * DELETE /api/tutoriels/:id
 */
router.delete('/:id', authMiddleware.isAdmin, tutorielsController.deleteTutoriel);

module.exports = router;
