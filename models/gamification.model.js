// models/gamification.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Gamification = {
  /**
   * 🔢 Obtenir les points d'un utilisateur
   */
  getPoints: (utilisateur_id, callback) => {
    const sql = `SELECT points, niveau FROM gamification WHERE utilisateur_id = ?`;
    db.query(sql, [utilisateur_id], callback);
  },

  /**
   * ➕ Ajouter des points à un utilisateur
   */
  ajouterPoints: (utilisateur_id, points, callback) => {
    const sql = `
      INSERT INTO gamification (utilisateur_id, points)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE points = points + VALUES(points)
    `;
    db.query(sql, [utilisateur_id, points], callback);
  },

  /**
   * 🏅 Mettre à jour le niveau d'un utilisateur
   */
  mettreAJourNiveau: (utilisateur_id, niveau, callback) => {
    const sql = `UPDATE gamification SET niveau = ? WHERE utilisateur_id = ?`;
    db.query(sql, [niveau, utilisateur_id], callback);
  },

  /**
   * 🥇 Récupérer les badges d'un utilisateur
   */
  getBadges: (utilisateur_id, callback) => {
    const sql = `SELECT badge FROM badges WHERE utilisateur_id = ?`;
    db.query(sql, [utilisateur_id], callback);
  },

  /**
   * 🎖️ Ajouter un badge à un utilisateur
   */
  ajouterBadge: (utilisateur_id, badge, callback) => {
    const sql = `
      INSERT INTO badges (utilisateur_id, badge)
      VALUES (?, ?)
    `;
    db.query(sql, [utilisateur_id, badge], callback);
  },

  /**
   * 📊 Obtenir le classement global (top 10)
   */
  getClassement: (callback) => {
    const sql = `
      SELECT u.id, u.nom, g.points, g.niveau
      FROM gamification g
      JOIN utilisateurs u ON g.utilisateur_id = u.id
      ORDER BY g.points DESC
      LIMIT 10
    `;
    db.query(sql, callback);
  }
};

module.exports = Gamification;
