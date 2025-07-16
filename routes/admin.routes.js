const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const auth = require('../middleware/authmiddleware'); // ✅ on accède à .verifyToken et .isAdmin

// ✅ Route publique : connexion
router.post('/login', adminController.loginAdmin);

// 🔒 Création d’un nouvel admin (réservé aux admins connectés)
router.post('/register', auth.verifyToken, auth.isAdmin, adminController.createAdmin);

// 🔒 Liste complète des admins
router.get('/', auth.verifyToken, auth.isAdmin, adminController.getAllAdmins);

// 📊 Statistiques (tableau de bord)
router.get('/stats', auth.verifyToken, auth.isAdmin, adminController.statsDashboard);

// 🚨 Signalements en attente
router.get('/signalements', auth.verifyToken, auth.isAdmin, adminController.signalements);

// ⚠️ Utilisateurs à alerte (signalés plusieurs fois)
router.get('/alertes', auth.verifyToken, auth.isAdmin, adminController.utilisateursAlerte);

// 🗑️ Supprimer un admin par ID
router.delete('/:id', auth.verifyToken, auth.isAdmin, adminController.deleteAdmin);

module.exports = router;
