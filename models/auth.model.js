// models/auth.model.js

const db = require('../database/dbConnection');

const Auth = {
  /**
   * Trouver un utilisateur par son adresse email
   * @param {string} email - Email de l'utilisateur
   * @param {function} callback - Callback (err, result)
   */
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM utilisateurs WHERE email = ?';
    db.query(query, [email], callback);
  },

  /**
   * Créer un nouvel utilisateur
   * @param {object} data - Contient nom, email, mot_de_passe (hashé)
   * @param {function} callback - Callback (err, result)
   */
  createUser: (data, callback) => {
    const query = `
      INSERT INTO utilisateurs (nom, email, mot_de_passe, role, profil_public, superlikes)
      VALUES (?, ?, ?, 'user', true, 0)
    `;
    const params = [data.nom, data.email, data.mot_de_passe];
    db.query(query, params, callback);
  }
};

module.exports = Auth;
