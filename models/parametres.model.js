// models/parametres.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Parametres = {
  /**
   * 🔍 Récupérer les paramètres d'un utilisateur
   * @param {number} userId
   */
  getByUserId: (userId, callback) => {
    const query = 'SELECT * FROM parametres WHERE user_id = ?';
    db.query(query, [userId], callback);
  },

  /**
   * 🆕 Créer des paramètres par défaut
   * Utilisé lorsqu’un utilisateur n’a encore aucune préférence enregistrée
   * @param {number} userId
   */
  createDefault: (userId, callback) => {
    const query = `
      INSERT INTO parametres (user_id, langue, notifications_activées, theme)
      VALUES (?, 'fr', 1, 'clair')
    `;
    db.query(query, [userId], callback);
  },

  /**
   * ✏️ Mettre à jour les paramètres d’un utilisateur
   * @param {number} userId
   * @param {Object} data - { langue, notifications_activees, theme }
   */
  update: (userId, data, callback) => {
    const { langue, notifications_activees, theme } = data;
    const query = `
      UPDATE parametres 
      SET langue = ?, notifications_activées = ?, theme = ?
      WHERE user_id = ?
    `;
    db.query(query, [langue, notifications_activees, theme, userId], callback);
  }
};

module.exports = Parametres;
