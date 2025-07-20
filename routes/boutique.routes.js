// routes/boutique.routes.js

const express = require('express');
const router = express.Router();
const BoutiqueController = require('../controllers/boutique.controller');
const { verifyToken } = require('../middleware/authmiddleware');

/**
 * 🔍 Récupérer les articles disponibles dans la boutique
 * @route GET /api/boutique
 */
router.get('/', verifyToken, BoutiqueController.getArticles);

/**
 * 🛒 Acheter un article
 * @route POST /api/boutique/acheter
 */
router.post('/acheter', verifyToken, BoutiqueController.acheterArticle);

module.exports = router;
