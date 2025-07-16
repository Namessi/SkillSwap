const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages.controller');
const auth = require('../middleware/authmiddleware'); 

// 🔐 Toutes les routes de messagerie nécessitent une authentification
router.use(auth.verifyToken);

/**
 * 📤 Envoyer un message à un autre utilisateur
 * @route POST /api/messages
 * @body { destinataire_id, contenu }
 */
router.post('/', messagesController.sendMessage);

/**
 * 💬 Récupérer la conversation entre l'utilisateur connecté et un autre utilisateur
 * @route GET /api/messages/conversation/:userId
 */
router.get('/conversation/:userId', messagesController.getConversation);

/**
 * 📥 Récupérer tous les messages reçus
 * @route GET /api/messages/received
 */
router.get('/received', messagesController.getReceivedMessages);

/**
 * 🗑️ Supprimer un message
 * @route DELETE /api/messages/:messageId
 */
router.delete('/:messageId', messagesController.deleteMessage);

module.exports = router;
