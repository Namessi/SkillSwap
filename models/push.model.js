// models/push.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Push = {
  /**
   * 💾 Enregistrer ou mettre à jour un abonnement push pour un utilisateur
   * @param {Object} data - Données d'abonnement : { utilisateur_id, endpoint, p256dh, auth }
   * @param {function} callback - Fonction de rappel pour gérer le résultat ou l'erreur
   */
  enregistrerAbonnement: (data, callback) => {
    const sql = `
      INSERT INTO abonnements_push (utilisateur_id, endpoint, p256dh, auth, date_enregistrement)
      VALUES (?, ?, ?, ?, NOW())
      ON DUPLICATE KEY UPDATE 
        endpoint = VALUES(endpoint),
        p256dh = VALUES(p256dh),
        auth = VALUES(auth)
    `;
    const params = [data.utilisateur_id, data.endpoint, data.p256dh, data.auth];

    // Insertion ou mise à jour selon si l'abonnement existe déjà
    db.query(sql, params, callback);
  },

  /**
   * ❌ Supprimer l’abonnement push d’un utilisateur
   * @param {number} utilisateur_id - ID de l'utilisateur dont on veut supprimer l'abonnement
   * @param {function} callback - Fonction de rappel pour gérer le résultat ou l'erreur
   */
  supprimerAbonnement: (utilisateur_id, callback) => {
    db.query(
      'DELETE FROM abonnements_push WHERE utilisateur_id = ?',
      [utilisateur_id],
      callback
    );
  }
};

module.exports = Push;
