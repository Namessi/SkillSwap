// models/admin.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Admin = {
  /**
   * 🔐 Authentifier un admin via son email
   */
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM admins WHERE email = ?';
    db.query(query, [email], callback);
  },

  /**
   * 👥 Récupérer la liste de tous les admins
   */
  getAll: (callback) => {
    const query = 'SELECT * FROM admins';
    db.query(query, callback);
  },

  /**
   * ➕ Créer un nouvel admin
   */
  create: (data, callback) => {
    const query = 'INSERT INTO admins (nom, email, mot_de_passe) VALUES (?, ?, ?)';
    const params = [data.nom, data.email, data.mot_de_passe];
    db.query(query, params, callback);
  },

  /**
   * 🗑️ Supprimer un admin
   */
  delete: (id, callback) => {
    const query = 'DELETE FROM admins WHERE id = ?';
    db.query(query, [id], callback);
  },

  /**
   * 📊 Statistiques pour le dashboard admin
   */
  getDashboardStats: (callback) => {
    const sql = `
      SELECT
        (SELECT COUNT(*) FROM utilisateurs) AS nb_utilisateurs,
        (SELECT COUNT(*) FROM matchs WHERE matched = true) AS nb_matchs,
        (SELECT COUNT(*) FROM signalements) AS nb_signalements,
        (SELECT COUNT(*) FROM disponibilites) AS nb_dispos
    `;
    db.query(sql, callback);
  },

  /**
   * 🚨 Signalements en attente
   */
  getSignalementsEnAttente: (callback) => {
    const sql = `
      SELECT s.id, u.nom AS plaignant, us.nom AS accuse, s.raison, s.statut, s.date_signalement
      FROM signalements s
      JOIN utilisateurs u ON u.id = s.utilisateur_a
      JOIN utilisateurs us ON us.id = s.utilisateur_signale
      WHERE s.statut = 'en_attente'
      ORDER BY s.date_signalement DESC
    `;
    db.query(sql, callback);
  },

  /**
   * ⚠️ Utilisateurs avec alertes (signalés plusieurs fois)
   */
  getUtilisateursAlerte: (callback) => {
    const sql = `
      SELECT utilisateur_signale, COUNT(*) AS nb_signalements
      FROM signalements
      GROUP BY utilisateur_signale
      HAVING nb_signalements >= 3
      ORDER BY nb_signalements DESC
    `;
    db.query(sql, callback);
  }
};

module.exports = Admin;
