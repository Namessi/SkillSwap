const express = require('express');
const router = express.Router();
const signalementsController = require('../controllers/signalements.controller');
const auth = require('../middleware/authmiddleware'); 

// ✅ Créer un signalement (utilisateur connecté)
router.post('/', auth.verifyToken, signalementsController.createSignalement);

// 🔐 Routes réservées aux admins
router.get('/', auth.verifyToken, auth.isAdmin, signalementsController.getAllSignalements);
router.get('/:id', auth.verifyToken, auth.isAdmin, signalementsController.getSignalementById);
router.delete('/:id', auth.verifyToken, auth.isAdmin, signalementsController.deleteSignalement);

module.exports = router;
