const db = require('../database/dbConnection');

exports.ajouterDisponibilites = (utilisateur_id, disponibilites, callback) => {
    const values = disponibilites.map(d => [utilisateur_id, d.jour, d.heure_debut, d.heure_fin]);
    const sql = `
        INSERT INTO disponibilites (utilisateur_id, jour, heure_debut, heure_fin)
        VALUES ?
    `;
    db.query(sql, [values], callback);
};

exports.supprimerDisponibilitesUtilisateur = (utilisateur_id, callback) => {
    db.query('DELETE FROM disponibilites WHERE utilisateur_id = ?', [utilisateur_id], callback);
};

exports.getDisponibilitesUtilisateur = (utilisateur_id, callback) => {
    db.query('SELECT jour, heure_debut, heure_fin FROM disponibilites WHERE utilisateur_id = ?', [utilisateur_id], callback);
};
