const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Support = {
  // Récupérer tous les tickets de support
  getAll: (callback) => {
    const query = 'SELECT * FROM support ORDER BY date_creation DESC';
    db.query(query, callback);
  },

  // Récupérer un ticket par ID
  getById: (id, callback) => {
    const query = 'SELECT * FROM support WHERE id = ?';
    db.query(query, [id], callback);
  },

  // Créer un nouveau ticket
  create: (data, callback) => {
    const query = `
      INSERT INTO support (utilisateur_id, sujet, message, date_creation)
      VALUES (?, ?, ?, NOW())
    `;
    const params = [data.utilisateur_id, data.sujet, data.message];
    db.query(query, params, callback);
  },

  // Supprimer un ticket par ID
  delete: (id, callback) => {
    const query = 'DELETE FROM support WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = Support;
