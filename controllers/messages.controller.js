// controllers/messages.controller.js

const Messages = require('../models/messages.model');

/**
 * @route   POST /api/messages
 * @desc    Envoyer un message à un autre utilisateur
 */
exports.sendMessage = (req, res) => {
  const expediteur_id = req.user.id;
  const { destinataire_id, contenu } = req.body;

  if (!destinataire_id || !contenu) {
    return res.status(400).json({ message: 'Le destinataire et le contenu sont requis' });
  }

  if (parseInt(destinataire_id) === expediteur_id) {
    return res.status(400).json({ message: 'Impossible de s’envoyer un message à soi-même' });
  }

  Messages.sendMessage({ expediteur_id, destinataire_id, contenu }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur serveur lors de l’envoi du message' });
    }

    res.status(201).json({
      message: 'Message envoyé avec succès',
      messageId: result.insertId
    });
  });
};

/**
 * @route   GET /api/messages/conversation/:userId
 * @desc    Récupérer la conversation entre l'utilisateur connecté et un autre utilisateur
 */
exports.getConversation = (req, res) => {
  const user1Id = req.user.id;
  const user2Id = parseInt(req.params.userId, 10);

  if (user1Id === user2Id) {
    return res.status(400).json({ message: 'Conversation invalide' });
  }

  Messages.getConversation(user1Id, user2Id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur serveur lors de la récupération des messages' });
    }

    res.status(200).json(results);
  });
};

/**
 * @route   GET /api/messages/received
 * @desc    Récupérer tous les messages reçus
 */
exports.getReceivedMessages = (req, res) => {
  const userId = req.user.id;

  Messages.getReceivedMessages(userId, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur serveur lors de la récupération des messages reçus' });
    }

    res.status(200).json(results);
  });
};

/**
 * @route   DELETE /api/messages/:messageId
 * @desc    Supprimer un message envoyé par l'utilisateur
 */
exports.deleteMessage = (req, res) => {
  const userId = req.user.id;
  const messageId = parseInt(req.params.messageId, 10);

  Messages.deleteMessage(messageId, userId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la suppression du message' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Message non trouvé ou non autorisé' });
    }

    res.status(200).json({ message: 'Message supprimé avec succès' });
  });
};
