const express = require('express');
const router = express.Router();
const tableauDeBordController = require('../controllers/tableauDeBord.controller');
const authMiddleware = require('../middleware/authmiddleware'); 

// ✅ Authentification requise pour toutes les routes du tableau de bord
router.use(authMiddleware.verifyToken);

// 🔐 Statistiques globales (admin uniquement)
router.get('/stats', authMiddleware.isAdmin, tableauDeBordController.getStats);

module.exports = router;
