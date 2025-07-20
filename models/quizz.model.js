const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Quizz = {
  // Récupérer tous les quizz
  getAll: (callback) => {
    const query = 'SELECT * FROM quizz ORDER BY categorie, id';
    db.query(query, callback);
  },

  // Récupérer un quizz par son id
  getById: (id, callback) => {
    const query = 'SELECT * FROM quizz WHERE id = ?';
    db.query(query, [id], callback);
  },

  // Créer un quizz
  create: ({ question, reponse_correcte, reponses_possibles, categorie }, callback) => {
    const query = `
      INSERT INTO quizz (question, reponse_correcte, reponses_possibles, categorie)
      VALUES (?, ?, ?, ?)
    `;
    db.query(query, [question, reponse_correcte, JSON.stringify(reponses_possibles), categorie], callback);
  },

  // Modifier un quizz
  update: (id, { question, reponse_correcte, reponses_possibles, categorie }, callback) => {
    const query = `
      UPDATE quizz
      SET question = ?, reponse_correcte = ?, reponses_possibles = ?, categorie = ?
      WHERE id = ?
    `;
    db.query(query, [question, reponse_correcte, JSON.stringify(reponses_possibles), categorie, id], callback);
  },

  // Supprimer un quizz
  delete: (id, callback) => {
    db.query('DELETE FROM quizz WHERE id = ?', [id], callback);
  },

  // Récupérer le nombre total d'essais d'un utilisateur sur un quizz
  getAttemptCount: (userId, quizzId, callback) => {
    const query = `
      SELECT COUNT(*) AS attempts
      FROM resultats_quizz
      WHERE utilisateur_id = ? AND quizz_id = ?
    `;
    db.query(query, [userId, quizzId], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0].attempts);
    });
  },

  // Enregistrer un essai (réponse donnée, bonne ou mauvaise)
  addAttempt: (userId, quizzId, reponseDonnee, correcte, callback) => {
    const query = `
      INSERT INTO resultats_quizz (utilisateur_id, quizz_id, reponse_donnee, correcte, date_essai)
      VALUES (?, ?, ?, ?, NOW())
    `;
    db.query(query, [userId, quizzId, reponseDonnee, correcte ? 1 : 0], callback);
  },

  // Récupérer le nombre d’échecs consécutifs récents
  getConsecutiveFailures: (userId, quizzId, callback) => {
    const query = `
      SELECT COUNT(*) AS failures
      FROM (
        SELECT correcte
        FROM resultats_quizz
        WHERE utilisateur_id = ? AND quizz_id = ?
        ORDER BY date_essai DESC
        LIMIT 5
      ) AS recent
      WHERE correcte = 0
    `;
    db.query(query, [userId, quizzId], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0].failures);
    });
  },

  // Enregistrer une réponse finale (utile pour gain de superlike)
  enregistrerReponse: (utilisateur_id, quiz_id, bonne_reponse, callback) => {
    const query = `
      INSERT INTO resultats_quizz (utilisateur_id, quizz_id, correcte, date_essai)
      VALUES (?, ?, ?, NOW())
    `;
    db.query(query, [utilisateur_id, quiz_id, bonne_reponse ? 1 : 0], callback);
  },

  // Ajouter un superlike à l'utilisateur
  ajouterSuperlike: (utilisateur_id, callback) => {
    db.query('UPDATE utilisateurs SET superlikes = superlikes + 1 WHERE id = ?', [utilisateur_id], callback);
  },

  // Récupérer le nombre de superlikes
  getSuperlikes: (utilisateur_id, callback) => {
    db.query('SELECT superlikes FROM utilisateurs WHERE id = ?', [utilisateur_id], callback);
  }
};

module.exports = Quizz;
