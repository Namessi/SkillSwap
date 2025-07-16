// models/messages.model.js

const db = require('../database/dbConnection');

const Messages = {
  /**
   * ➕ Envoyer un message
   * @param {Object} data - { expediteur_id, destinataire_id, contenu }
   */
  sendMessage: (data, callback) => {
    const query = `
      INSERT INTO messages (expediteur_id, destinataire_id, contenu, date_envoi)
      VALUES (?, ?, ?, NOW())
    `;
    const params = [data.expediteur_id, data.destinataire_id, data.contenu];
    db.query(query, params, callback);
  },

  /**
   * 💬 Récupérer tous les messages entre deux utilisateurs (conversation complète)
   * @param {number} user1Id - ID de l'utilisateur connecté
   * @param {number} user2Id - ID de l'interlocuteur
   */
  getConversation: (user1Id, user2Id, callback) => {
    const query = `
      SELECT m.*, 
             u1.nom AS expediteur_nom, u1.avatar AS expediteur_avatar,
             u2.nom AS destinataire_nom, u2.avatar AS destinataire_avatar
      FROM messages m
      JOIN utilisateurs u1 ON m.expediteur_id = u1.id
      JOIN utilisateurs u2 ON m.destinataire_id = u2.id
      WHERE (m.expediteur_id = ? AND m.destinataire_id = ?)
         OR (m.expediteur_id = ? AND m.destinataire_id = ?)
      ORDER BY m.date_envoi ASC
    `;
    db.query(query, [user1Id, user2Id, user2Id, user1Id], callback);
  },

  /**
   * 📥 Récupérer tous les messages reçus par l'utilisateur connecté
   * @param {number} userId
   */
  getReceivedMessages: (userId, callback) => {
    const query = `
      SELECT m.*, u.nom AS expediteur_nom, u.avatar AS expediteur_avatar
      FROM messages m
      JOIN utilisateurs u ON m.expediteur_id = u.id
      WHERE m.destinataire_id = ?
      ORDER BY m.date_envoi DESC
    `;
    db.query(query, [userId], callback);
  },

  /**
   * 🗑️ Supprimer un message (autorisé seulement si utilisateur concerné)
   * @param {number} messageId
   * @param {number} userId
   */
  deleteMessage: (messageId, userId, callback) => {
    const query = `
      DELETE FROM messages
      WHERE id = ?
      AND (expediteur_id = ? OR destinataire_id = ?)
    `;
    db.query(query, [messageId, userId, userId], callback);
  }
};

module.exports = Messages;
