// models/recompenses.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Recompenses = {
  /**
   * 🎁 Ajouter une récompense à un utilisateur
   * @param {Object} data - { utilisateur_id, type, valeur }
   */
  ajouterRecompense: (data, callback) => {
    const query = `
      INSERT INTO recompenses (utilisateur_id, type, valeur, date_obtention)
      VALUES (?, ?, ?, NOW())
    `;
    db.query(query, [data.utilisateur_id, data.type, data.valeur], callback);
  },

  /**
   * 📋 Récupérer les récompenses d’un utilisateur
   * @param {number} utilisateur_id
   */
  getRecompensesUtilisateur: (utilisateur_id, callback) => {
    const query = `
      SELECT * FROM recompenses
      WHERE utilisateur_id = ?
      ORDER BY date_obtention DESC
    `;
    db.query(query, [utilisateur_id], callback);
  },

  /**
   * ❌ Supprimer une récompense par son ID (si admin ou utilisateur concerné)
   * @param {number} recompense_id
   * @param {number} utilisateur_id
   */
  supprimerRecompense: (recompense_id, utilisateur_id, callback) => {
    const query = `
      DELETE FROM recompenses
      WHERE id = ? AND utilisateur_id = ?
    `;
    db.query(query, [recompense_id, utilisateur_id], callback);
  }
};

module.exports = Recompenses;
