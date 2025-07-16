const express = require('express');
const router = express.Router();
const utilisateursController = require('../controllers/utilisateurs.controller');
const authMiddleware = require('../middleware/authmiddleware'); 

// 🔐 Toutes les routes nécessitent une authentification
router.use(authMiddleware.verifyToken);

/**
 * 👥 Récupérer tous les utilisateurs (admin uniquement)
 * GET /api/utilisateurs
 */
router.get('/', authMiddleware.isAdmin, utilisateursController.getAllUtilisateurs);

/**
 * 🔍 Récupérer un utilisateur par ID (admin uniquement)
 * GET /api/utilisateurs/:id
 */
router.get('/:id', authMiddleware.isAdmin, utilisateursController.getUtilisateurById);

/**
 * ✏️ Mettre à jour un utilisateur (admin ou utilisateur lui-même)
 * PUT /api/utilisateurs/:id
 */
router.put('/:id', utilisateursController.updateUtilisateur); // contrôle dans le controller

/**
 * 🗑️ Supprimer un utilisateur (admin uniquement)
 * DELETE /api/utilisateurs/:id
 */
router.delete('/:id', authMiddleware.isAdmin, utilisateursController.deleteUtilisateur);

module.exports = router;
