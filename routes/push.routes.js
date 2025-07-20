// routes/push.routes.js

const express = require('express');
const router = express.Router();
const pushController = require('../controllers/push.controller');
const { verifyToken } = require('../middleware/authmiddleware');

// 🔔 Enregistrement ou mise à jour de l'abonnement push
// @route   POST /api/push/abonnement
// @access  Authentifié
router.post('/abonnement', verifyToken, pushController.inscrireAuxNotifications);

// ❌ Suppression de l'abonnement push de l'utilisateur connecté
// @route   DELETE /api/push/abonnement
// @access  Authentifié
router.delete('/abonnement', verifyToken, pushController.seDesinscrire);

module.exports = router;
