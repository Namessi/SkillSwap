// models/traduction.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

/**
 * 🔍 Récupérer une traduction pour une clé donnée et une langue
 * @param {string} cle - Clé de la traduction (ex: 'bienvenue')
 * @param {string} langue - Code langue ISO (ex: 'fr', 'en', etc.)
 */
exports.getTraduction = (cle, langue, callback) => {
  const sql = 'SELECT texte FROM traductions WHERE cle = ? AND langue = ?';
  db.query(sql, [cle, langue], (err, results) => {
    if (err) return callback(err);
    if (results.length > 0) {
      callback(null, results[0].texte);
    } else {
      callback(null, null); // Pas de traduction trouvée
    }
  });
};

/**
 * ➕ Ajouter ou mettre à jour une traduction (upsert)
 * @param {string} cle - Clé de traduction
 * @param {string} langue - Code langue ISO
 * @param {string} texte - Texte traduit
 */
exports.ajouterOuMettreAJourTraduction = (cle, langue, texte, callback) => {
  const sql = `
    INSERT INTO traductions (cle, langue, texte)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE texte = VALUES(texte)
  `;
  db.query(sql, [cle, langue, texte], callback);
};

/**
 * 📋 Récupérer toutes les traductions pour une clé donnée (utile pour affichage multi-langue)
 * @param {string} cle
 */
exports.getToutesTraductionsParCle = (cle, callback) => {
  const sql = 'SELECT langue, texte FROM traductions WHERE cle = ?';
  db.query(sql, [cle], callback);
};

/**
 * 🗑️ Supprimer une traduction spécifique (clé + langue)
 * @param {string} cle
 * @param {string} langue
 */
exports.supprimerTraduction = (cle, langue, callback) => {
  const sql = 'DELETE FROM traductions WHERE cle = ? AND langue = ?';
  db.query(sql, [cle, langue], callback);
};

/**
 * 📦 Liste complète de toutes les traductions stockées (optionnel : pagination)
 */
exports.getToutesLesTraductions = (callback) => {
  const sql = 'SELECT * FROM traductions ORDER BY cle, langue';
  db.query(sql, callback);
};
