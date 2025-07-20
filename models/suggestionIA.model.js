// models/suggestionIA.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const SuggestionIA = {
  /**
   * 🔍 Générer des suggestions intelligentes pour un utilisateur donné
   * @param {number} utilisateur_id
   * @param {function} callback
   */
  genererSuggestions: (utilisateur_id, callback) => {
    const sql = `
      SELECT u.id, u.nom, u.prenom, u.photo_profil, u.bio
      FROM utilisateurs u
      JOIN localisations l ON u.id = l.utilisateur_id
      WHERE u.id != ?
        AND u.id NOT IN (
          SELECT utilisateur_2 FROM matchs WHERE utilisateur_1 = ?
        )
        AND u.id NOT IN (
          SELECT suggestion_id FROM suggestions_ignores WHERE utilisateur_id = ?
        )
      ORDER BY RAND()
      LIMIT 10
    `;
    db.query(sql, [utilisateur_id, utilisateur_id, utilisateur_id], callback);
  },

  /**
   * 🚫 Enregistrer une suggestion ignorée par l'utilisateur
   * @param {number} utilisateur_id
   * @param {number} suggestion_id
   * @param {function} callback
   */
  ignorerSuggestion: (utilisateur_id, suggestion_id, callback) => {
    const sql = `
      INSERT IGNORE INTO suggestions_ignores (utilisateur_id, suggestion_id)
      VALUES (?, ?)
    `;
    db.query(sql, [utilisateur_id, suggestion_id], callback);
  }
};

module.exports = SuggestionIA;
