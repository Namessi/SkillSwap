// models/defis.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Defis = {
  /**
   * 🔍 Récupérer tous les défis hebdomadaires disponibles
   */
  getTous: (callback) => {
    const sql = 'SELECT * FROM defis ORDER BY date_debut DESC';
    db.query(sql, callback);
  },

  /**
   * ✅ Marquer un défi comme validé pour un utilisateur
   * @param {number} utilisateur_id
   * @param {number} defi_id
   */
  marquerCommeReussi: (utilisateur_id, defi_id, callback) => {
    const sql = `
      INSERT IGNORE INTO defis_valides (utilisateur_id, defi_id, date_validation)
      VALUES (?, ?, NOW())
    `;
    db.query(sql, [utilisateur_id, defi_id], callback);
  },

  /**
   * 📋 Récupérer tous les défis déjà validés par un utilisateur
   * @param {number} utilisateur_id
   */
  getValidesPourUtilisateur: (utilisateur_id, callback) => {
    const sql = `
      SELECT d.*, dv.date_validation
      FROM defis_valides dv
      JOIN defis d ON dv.defi_id = d.id
      WHERE dv.utilisateur_id = ?
      ORDER BY dv.date_validation DESC
    `;
    db.query(sql, [utilisateur_id], callback);
  }
};

module.exports = Defis;
