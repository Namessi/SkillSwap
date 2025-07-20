// controllers/chat.controller.js

const Chat = require('../models/chat.model');

/**
 * @route   POST /api/chat/message
 * @desc    ➕ Envoyer un message privé texte ou vocal
 */
exports.envoyerMessage = (req, res) => {
  const { destinataire_id, contenu, type, fichier } = req.body;
  const expediteur_id = req.user.id;

  if (!destinataire_id || (!contenu && !fichier)) {
    return res.status(400).json({ message: 'Contenu ou fichier requis' });
  }

  Chat.envoyerMessage({ expediteur_id, destinataire_id, contenu, type, fichier }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur envoi message', err });
    res.status(201).json({ message: 'Message envoyé', id: result.insertId });
  });
};

/**
 * @route   GET /api/chat/conversation/:id
 * @desc    💬 Récupérer tous les messages avec un utilisateur
 */
exports.getConversation = (req, res) => {
  const user1 = req.user.id;
  const user2 = req.params.id;

  Chat.getConversation(user1, user2, (err, messages) => {
    if (err) return res.status(500).json({ message: 'Erreur récupération messages' });
    res.status(200).json(messages);
  });
};

/**
 * @route   POST /api/chat/groupe
 * @desc    ➕ Créer un groupe de chat
 */
exports.creerGroupe = (req, res) => {
  const { nom, membres } = req.body;
  const createur_id = req.user.id;

  if (!nom || !membres || !Array.isArray(membres) || membres.length < 1) {
    return res.status(400).json({ message: 'Nom et membres requis' });
  }

  Chat.creerGroupe({ nom, createur_id, membres }, (err, groupId) => {
    if (err) return res.status(500).json({ message: 'Erreur création groupe' });
    res.status(201).json({ message: 'Groupe créé', group_id: groupId });
  });
};

/**
 * @route   POST /api/chat/groupe/:id/message
 * @desc    💬 Envoyer un message dans un groupe
 */
exports.envoyerMessageGroupe = (req, res) => {
  const { contenu, fichier, type } = req.body;
  const utilisateur_id = req.user.id;
  const groupe_id = req.params.id;

  if (!contenu && !fichier) {
    return res.status(400).json({ message: 'Contenu ou fichier requis' });
  }

  Chat.envoyerMessageGroupe({ utilisateur_id, groupe_id, contenu, fichier, type }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur envoi message groupe' });
    res.status(201).json({ message: 'Message groupe envoyé', id: result.insertId });
  });
};

/**
 * @route   GET /api/chat/groupe/:id
 * @desc    📚 Récupérer les messages d’un groupe
 */
exports.getMessagesGroupe = (req, res) => {
  const groupe_id = req.params.id;

  Chat.getMessagesGroupe(groupe_id, (err, messages) => {
    if (err) return res.status(500).json({ message: 'Erreur récupération groupe' });
    res.status(200).json(messages);
  });
};

/**
 * @route   GET /api/chat/contacts/online
 * @desc    🔄 Récupérer les contacts en ligne
 */
exports.utilisateursEnLigne = (req, res) => {
  Chat.utilisateursEnLigne((err, utilisateurs) => {
    if (err) return res.status(500).json({ message: 'Erreur récupération utilisateurs en ligne' });
    res.status(200).json(utilisateurs);
  });
};
