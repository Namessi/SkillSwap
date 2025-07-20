// models/agenda.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Agenda = {
  /**
   * ➕ Créer un événement dans l’agenda
   * @param {Object} data - { utilisateur_id, titre, description, date, heure_debut, heure_fin }
   */
  creerEvenement: (data, callback) => {
    const query = `
      INSERT INTO agenda (utilisateur_id, titre, description, date, heure_debut, heure_fin)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.utilisateur_id,
      data.titre,
      data.description || '',
      data.date,
      data.heure_debut,
      data.heure_fin
    ];
    db.query(query, params, callback);
  },

  /**
   * 📅 Récupérer tous les événements d’un utilisateur
   * @param {number} utilisateur_id
   */
  getEvenementsUtilisateur: (utilisateur_id, callback) => {
    const query = `
      SELECT * FROM agenda
      WHERE utilisateur_id = ?
      ORDER BY date ASC, heure_debut ASC
    `;
    db.query(query, [utilisateur_id], callback);
  },

  /**
   * ❌ Supprimer un événement (seulement si l’utilisateur en est le créateur)
   * @param {number} id
   * @param {number} utilisateur_id
   */
  supprimerEvenement: (id, utilisateur_id, callback) => {
    const query = `
      DELETE FROM agenda
      WHERE id = ? AND utilisateur_id = ?
    `;
    db.query(query, [id, utilisateur_id], (err, result) => {
      if (err) return callback(err);
      callback(null, result.affectedRows);
    });
  }
};

module.exports = Agenda;
