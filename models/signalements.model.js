const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Signalement = {
  // Récupérer tous les signalements
  getAll: (callback) => {
    const sql = 'SELECT * FROM signalements ORDER BY date_signalement DESC';
    db.query(sql, callback);
  },

  // Récupérer un signalement par son ID
  getById: (id, callback) => {
    const sql = 'SELECT * FROM signalements WHERE id = ?';
    db.query(sql, [id], callback);
  },

  // Créer un nouveau signalement
  create: (data, callback) => {
    const { utilisateur_id, type, description } = data;
    const sql = `
      INSERT INTO signalements (utilisateur_id, type, description, date_signalement)
      VALUES (?, ?, ?, NOW())
    `;
    db.query(sql, [utilisateur_id, type, description], callback);
  },

  // Supprimer un signalement par son ID
  delete: (id, callback) => {
    const sql = 'DELETE FROM signalements WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = Signalement;
