const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Chat = {
  /**
   * 💬 Créer une nouvelle conversation privée
   * @param {number[]} participants - Tableau d'IDs utilisateurs (2 max pour conversation privée)
   */
  creerConversation: (participants, callback) => {
    const query = `INSERT INTO conversations (type) VALUES ('privee')`;
    db.query(query, (err, result) => {
      if (err) return callback(err);

      const conversation_id = result.insertId;
      const values = participants.map((user_id) => [conversation_id, user_id]);

      db.query(`INSERT INTO participants_conversation (conversation_id, utilisateur_id) VALUES ?`, [values], (err2) => {
        if (err2) return callback(err2);
        callback(null, { conversation_id });
      });
    });
  },

  /**
   * 📥 Envoyer un message dans une conversation
   * @param {Object} data - { conversation_id, expediteur_id, contenu }
   */
  envoyerMessage: (data, callback) => {
    const query = `
      INSERT INTO messages_conversation (conversation_id, expediteur_id, contenu, date_envoi)
      VALUES (?, ?, ?, NOW())
    `;
    const { conversation_id, expediteur_id, contenu } = data;
    db.query(query, [conversation_id, expediteur_id, contenu], callback);
  },

  /**
   * 📨 Récupérer les messages d'une conversation
   * @param {number} conversation_id
   */
  getMessages: (conversation_id, callback) => {
    const query = `
      SELECT m.*, u.nom, u.avatar
      FROM messages_conversation m
      JOIN utilisateurs u ON m.expediteur_id = u.id
      WHERE m.conversation_id = ?
      ORDER BY m.date_envoi ASC
    `;
    db.query(query, [conversation_id], callback);
  },

  /**
   * 👥 Récupérer les conversations d'un utilisateur
   * @param {number} utilisateur_id
   */
  getConversationsUtilisateur: (utilisateur_id, callback) => {
    const query = `
      SELECT c.id, c.type, MAX(m.date_envoi) AS dernier_message
      FROM conversations c
      JOIN participants_conversation p ON c.id = p.conversation_id
      LEFT JOIN messages_conversation m ON c.id = m.conversation_id
      WHERE p.utilisateur_id = ?
      GROUP BY c.id
      ORDER BY dernier_message DESC
    `;
    db.query(query, [utilisateur_id], callback);
  }
};

module.exports = Chat;
