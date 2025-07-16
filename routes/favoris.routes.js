// routes/favoris.routes.js

const express = require('express');
const router = express.Router();
const favorisController = require('../controllers/favoris.controller');
const auth = require('../middleware/authmiddleware'); 

// 🔐 Toutes les routes nécessitent une authentification
router.use(auth.verifyToken);

/**
 * ➕ Ajouter un utilisateur aux favoris
 * @route POST /api/favoris
 */
router.post('/', favorisController.addFavori);

/**
 * 🗑️ Supprimer un favori par son ID
 * @route DELETE /api/favoris/:favoriId
 */
router.delete('/:favoriId', favorisController.removeFavori);

/**
 * 📄 Lister tous les favoris de l'utilisateur connecté
 * @route GET /api/favoris
 */
router.get('/', favorisController.listFavoris);

module.exports = router;
