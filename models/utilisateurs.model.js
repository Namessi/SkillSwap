const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Utilisateurs = {
  // Récupérer tous les utilisateurs
  getAll: (callback) => {
    const query = `
      SELECT id, nom, email 
      FROM utilisateurs 
      ORDER BY nom ASC
    `;
    db.query(query, callback);
  },

  // Récupérer un utilisateur par son ID
  getById: (id, callback) => {
    const query = `
      SELECT id, nom, email 
      FROM utilisateurs 
      WHERE id = ?
    `;
    db.query(query, [id], callback);
  },

  // Mettre à jour les données d’un utilisateur (hors mot de passe)
  update: (id, data, callback) => {
    const query = `
      UPDATE utilisateurs 
      SET nom = ?, email = ?
      WHERE id = ?
    `;
    const params = [data.nom, data.email, id];
    db.query(query, params, callback);
  },

  // Supprimer un utilisateur par ID
  delete: (id, callback) => {
    const query = `
      DELETE FROM utilisateurs 
      WHERE id = ?
    `;
    db.query(query, [id], callback);
  }
};

module.exports = Utilisateurs;
