const express = require('express');
const router = express.Router();
const supportController = require('../controllers/support.controller');
const authMiddleware = require('../middleware/authmiddleware'); 

// ✅ Créer un ticket (accessible publiquement)
router.post('/', supportController.createTicket);

// 🔐 Middleware d’authentification requis pour les routes suivantes
router.use(authMiddleware.verifyToken);

// 🔐 Récupérer tous les tickets (admin uniquement)
router.get('/', authMiddleware.isAdmin, supportController.getAllTickets);

// 🔐 Récupérer un ticket par son ID (admin ou propriétaire)
router.get('/:id', supportController.getTicketById);

// 🔐 Supprimer un ticket
router.delete('/:id', supportController.deleteTicket);

module.exports = router;
