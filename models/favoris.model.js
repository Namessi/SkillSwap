// models/favoris.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Favoris = {
  /**
   * ➕ Ajouter un favori (relation user_id → favori_id)
   * @param {number} userId
   * @param {number} favoriId
   */
  add: (userId, favoriId, callback) => {
    const query = `
      INSERT INTO favoris (user_id, favori_id)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE date_ajout = NOW()
    `;
    db.query(query, [userId, favoriId], callback);
  },

  /**
   * 🗑️ Supprimer un favori
   * @param {number} userId
   * @param {number} favoriId
   */
  remove: (userId, favoriId, callback) => {
    const query = 'DELETE FROM favoris WHERE user_id = ? AND favori_id = ?';
    db.query(query, [userId, favoriId], callback);
  },

  /**
   * 📄 Lister les favoris d’un utilisateur avec détails
   * @param {number} userId
   */
  findByUserId: (userId, callback) => {
    const query = `
      SELECT u.id, u.nom, u.email, u.avatar, u.localisation, u.last_seen
      FROM favoris f
      JOIN utilisateurs u ON u.id = f.favori_id
      WHERE f.user_id = ?
    `;
    db.query(query, [userId], callback);
  }
};

module.exports = Favoris;
