const db = require('../database/dbConnection');

// Enregistrer une suggestion
exports.ajouterSuggestion = (utilisateur_id, suggestion_id, callback) => {
    const sql = `
        INSERT IGNORE INTO suggestions_hebdo (utilisateur_id, suggestion_id)
        VALUES (?, ?)
    `;
    db.query(sql, [utilisateur_id, suggestion_id], callback);
};

// Récupérer les suggestions de l’utilisateur
exports.getSuggestionsPourUtilisateur = (utilisateur_id, callback) => {
    const sql = `
        SELECT u.id, u.nom, u.prenom, u.photo_profil, u.bio
        FROM suggestions_hebdo s
        JOIN utilisateurs u ON u.id = s.suggestion_id
        WHERE s.utilisateur_id = ?
        ORDER BY s.date_suggestion DESC
    `;
    db.query(sql, [utilisateur_id], callback);
};
