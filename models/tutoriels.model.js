const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Tutoriels = {
  // Récupérer tous les tutoriels
  getAll: (callback) => {
    const query = 'SELECT * FROM tutoriels ORDER BY id DESC';
    db.query(query, callback);
  },

  // Récupérer un tutoriel par son ID
  getById: (id, callback) => {
    const query = 'SELECT * FROM tutoriels WHERE id = ?';
    db.query(query, [id], callback);
  },

  // Ajouter un nouveau tutoriel
  create: (data, callback) => {
    const { titre, contenu, categorie, url_video } = data;
    const query = `
      INSERT INTO tutoriels (titre, contenu, categorie, url_video, date_creation)
      VALUES (?, ?, ?, ?, NOW())
    `;
    db.query(query, [titre, contenu, categorie, url_video], callback);
  },

  // Mettre à jour un tutoriel existant
  update: (id, data, callback) => {
    const { titre, contenu, categorie, url_video } = data;
    const query = `
      UPDATE tutoriels
      SET titre = ?, contenu = ?, categorie = ?, url_video = ?, date_modification = NOW()
      WHERE id = ?
    `;
    db.query(query, [titre, contenu, categorie, url_video, id], callback);
  },

  // Supprimer un tutoriel
  delete: (id, callback) => {
    const query = 'DELETE FROM tutoriels WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = Tutoriels;
