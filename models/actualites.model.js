// models/actualites.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Actualites = {
  /**
   * 📰 Récupérer les actualités personnalisées pour un utilisateur
   * @param {number} utilisateur_id
   */
  getActualitesPourUtilisateur: (utilisateur_id, callback) => {
    const query = `
      SELECT a.*, u.nom AS auteur_nom, u.photo_profil
      FROM actualites a
      JOIN utilisateurs u ON a.utilisateur_id = u.id
      WHERE a.utilisateur_id != ?
      ORDER BY a.date_creation DESC
      LIMIT 30
    `;
    db.query(query, [utilisateur_id], callback);
  },

  /**
   * ➕ Créer une nouvelle actualité
   * @param {Object} data - { utilisateur_id, type, contenu }
   */
  creerActualite: (data, callback) => {
    const query = `
      INSERT INTO actualites (utilisateur_id, type, contenu, date_creation)
      VALUES (?, ?, ?, NOW())
    `;
    const { utilisateur_id, type, contenu } = data;
    db.query(query, [utilisateur_id, type, contenu], callback);
  },

  /**
   * 🗑️ Supprimer une actualité
   * @param {number} actualite_id
   * @param {number} utilisateur_id
   */
  supprimerActualite: (actualite_id, utilisateur_id, callback) => {
    const query = `
      DELETE FROM actualites
      WHERE id = ? AND utilisateur_id = ?
    `;
    db.query(query, [actualite_id, utilisateur_id], callback);
  }
};

module.exports = Actualites;
