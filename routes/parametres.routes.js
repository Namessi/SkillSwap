const express = require('express');
const router = express.Router();
const parametresController = require('../controllers/parametres.controller');
const auth = require('../middleware/authmiddleware'); 

// 🔐 Toutes les routes nécessitent une authentification
router.use(auth.verifyToken);

/**
 * ⚙️ Récupérer les paramètres de l'utilisateur connecté
 * GET /api/parametres
 */
router.get('/', parametresController.getParametres);

/**
 * 🛠️ Mettre à jour les paramètres de l'utilisateur connecté
 * PUT /api/parametres
 */
router.put('/', parametresController.updateParametres);

module.exports = router;
