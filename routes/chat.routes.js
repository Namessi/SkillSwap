// routes/chat.routes.js

const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chat.controller');
const { verifyToken } = require('../middleware/authmiddleware');

/**
 * ➕ Envoyer un message privé (texte ou vocal)
 * @route   POST /api/chat/message
 */
router.post('/message', verifyToken, ChatController.envoyerMessage);

/**
 * 💬 Récupérer la conversation avec un utilisateur
 * @route   GET /api/chat/conversation/:id
 */
router.get('/conversation/:id', verifyToken, ChatController.getConversation);

/**
 * ➕ Créer un groupe de chat
 * @route   POST /api/chat/groupe
 */
router.post('/groupe', verifyToken, ChatController.creerGroupe);

/**
 * 💬 Envoyer un message dans un groupe
 * @route   POST /api/chat/groupe/:id/message
 */
router.post('/groupe/:id/message', verifyToken, ChatController.envoyerMessageGroupe);

/**
 * 📚 Récupérer les messages d’un groupe
 * @route   GET /api/chat/groupe/:id
 */
router.get('/groupe/:id', verifyToken, ChatController.getMessagesGroupe);

/**
 * 🔄 Récupérer les contacts en ligne
 * @route   GET /api/chat/contacts/online
 */
router.get('/contacts/online', verifyToken, ChatController.utilisateursEnLigne);

module.exports = router;
