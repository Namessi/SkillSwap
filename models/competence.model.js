// models/competence.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Competence = {
  /**
   * 🔍 Obtenir toutes les compétences de l'utilisateur
   * @param {number} userId
   */
  getAllByUser: (userId, callback) => {
    const query = 'SELECT * FROM competences WHERE user_id = ?';
    db.query(query, [userId], callback);
  },

  /**
   * 🔍 Obtenir une compétence par son ID et utilisateur
   * @param {number} id
   * @param {number} userId
   */
  getByIdAndUser: (id, userId, callback) => {
    const query = 'SELECT * FROM competences WHERE id = ? AND user_id = ?';
    db.query(query, [id, userId], callback);
  },

  /**
   * ➕ Ajouter une compétence (liée à un utilisateur)
   */
  create: (data, callback) => {
    const query = 'INSERT INTO competences (nom, description, user_id) VALUES (?, ?, ?)';
    db.query(query, [data.nom, data.description, data.user_id], callback);
  },

  /**
   * ✏️ Modifier une compétence
   */
  update: (id, data, callback) => {
    const query = 'UPDATE competences SET nom = ?, description = ? WHERE id = ?';
    db.query(query, [data.nom, data.description, id], callback);
  },

  /**
   * 🗑️ Supprimer une compétence
   */
  delete: (id, callback) => {
    const query = 'DELETE FROM competences WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = Competence;
