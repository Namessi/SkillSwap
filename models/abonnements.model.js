// models/abonnements.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Abonnement = {
  /**
   * Créer un nouvel abonnement
   * @param {object} data - Contient user_id, type, date_debut, date_fin
   * @param {function} callback
   */
  create: (data, callback) => {
    const query = `
      INSERT INTO abonnements (user_id, type, date_debut, date_fin)
      VALUES (?, ?, ?, ?)
    `;
    const params = [data.user_id, data.type, data.date_debut, data.date_fin];
    db.query(query, params, callback);
  },

  /**
   * Récupérer tous les abonnements (admin uniquement)
   */
  getAll: (callback) => {
    const query = 'SELECT * FROM abonnements';
    db.query(query, callback);
  },

  /**
   * Récupérer un abonnement par son ID
   * @param {number} id
   */
  getById: (id, callback) => {
    const query = 'SELECT * FROM abonnements WHERE id = ?';
    db.query(query, [id], callback);
  },

  /**
   * Supprimer un abonnement par ID
   */
  delete: (id, callback) => {
    const query = 'DELETE FROM abonnements WHERE id = ?';
    db.query(query, [id], callback);
  },

  /**
   * Récupérer tous les abonnements d’un utilisateur spécifique
   */
  getByUserId: (userId, callback) => {
    const query = 'SELECT * FROM abonnements WHERE user_id = ? ORDER BY date_debut DESC';
    db.query(query, [userId], callback);
  }
};

module.exports = Abonnement;
