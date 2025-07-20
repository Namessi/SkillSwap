// models/boutique.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Boutique = {
  /**
   * 🛒 Récupérer tous les articles disponibles dans la boutique
   */
  getAll: (callback) => {
    const sql = `
      SELECT id, nom, description, prix_points
      FROM boutique
      ORDER BY prix_points ASC
    `;
    db.query(sql, callback);
  },

  /**
   * 💸 Acheter un article avec les points de l'utilisateur
   * @param {number} utilisateur_id - ID de l'utilisateur
   * @param {number} article_id - ID de l'article à acheter
   */
  acheter: (utilisateur_id, article_id, callback) => {
    // Vérifie le prix de l'article et les points de l'utilisateur
    const checkQuery = `
      SELECT u.points, b.prix_points
      FROM utilisateurs u, boutique b
      WHERE u.id = ? AND b.id = ?
    `;

    db.query(checkQuery, [utilisateur_id, article_id], (err, result) => {
      if (err) return callback(err);

      if (result.length === 0) return callback(new Error("Article ou utilisateur introuvable"));

      const { points, prix_points } = result[0];

      if (points < prix_points) {
        const erreur = new Error("Points insuffisants");
        erreur.code = 'POINTS_INSUFFISANTS';
        return callback(erreur);
      }

      // Déduit les points et enregistre l'achat
      const achatQuery = `
        START TRANSACTION;
        UPDATE utilisateurs SET points = points - ? WHERE id = ?;
        INSERT INTO achats (utilisateur_id, article_id, date_achat)
        VALUES (?, ?, NOW());
        COMMIT;
      `;

      db.query(achatQuery, [prix_points, utilisateur_id, utilisateur_id, article_id], (err) => {
        if (err) {
          // En cas d’erreur, rollback
          db.query("ROLLBACK", () => callback(err));
        } else {
          callback(null, { success: true });
        }
      });
    });
  }
};

module.exports = Boutique;
