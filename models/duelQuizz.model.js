// models/duelQuizz.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const DuelQuizz = {
  /**
   * ➕ Créer un nouveau duel entre deux utilisateurs sur un quizz
   * @param {Object} data - { utilisateur_id, adversaire_id, quizz_id }
   */
  creerDuel: ({ utilisateur_id, adversaire_id, quizz_id }, callback) => {
    const sql = `
      INSERT INTO duels_quizz (utilisateur_id, adversaire_id, quizz_id, date_creation)
      VALUES (?, ?, ?, NOW())
    `;
    db.query(sql, [utilisateur_id, adversaire_id, quizz_id], callback);
  },

  /**
   * ✅ Enregistrer une réponse à un duel
   * @param {Object} data - { duel_id, utilisateur_id, reponse, correcte }
   */
  repondreDuel: ({ duel_id, utilisateur_id, reponse, correcte }, callback) => {
    const sql = `
      INSERT INTO reponses_duel (duel_id, utilisateur_id, reponse, correcte, date_reponse)
      VALUES (?, ?, ?, ?, NOW())
    `;
    db.query(sql, [duel_id, utilisateur_id, reponse, correcte ? 1 : 0], callback);
  },

  /**
   * 📋 Récupérer les duels de l'utilisateur connecté
   * @param {number} utilisateur_id
   */
  getDuelsUtilisateur: (utilisateur_id, callback) => {
    const sql = `
      SELECT d.id AS duel_id, q.question, q.categorie,
             u1.nom AS joueur1_nom, u2.nom AS joueur2_nom,
             d.date_creation,
             GROUP_CONCAT(r.utilisateur_id, ':', r.correcte ORDER BY r.date_reponse SEPARATOR '|') AS reponses
      FROM duels_quizz d
      JOIN quizz q ON d.quizz_id = q.id
      JOIN utilisateurs u1 ON d.utilisateur_id = u1.id
      JOIN utilisateurs u2 ON d.adversaire_id = u2.id
      LEFT JOIN reponses_duel r ON r.duel_id = d.id
      WHERE d.utilisateur_id = ? OR d.adversaire_id = ?
      GROUP BY d.id
      ORDER BY d.date_creation DESC
    `;
    db.query(sql, [utilisateur_id, utilisateur_id], callback);
  }
};

module.exports = DuelQuizz;
