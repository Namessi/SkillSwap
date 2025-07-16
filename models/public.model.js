const db = require('../database/dbConnection');

exports.getCompetences = (callback) => {
    db.query('SELECT id, nom FROM competences ORDER BY nom ASC', callback);
};

exports.getTutosPublics = (callback) => {
    db.query('SELECT id, titre, resume, lien_video FROM tutoriels WHERE public = 1 ORDER BY id DESC LIMIT 50', callback);
};

exports.getStats = (callback) => {
    const sql = `
        SELECT
            (SELECT COUNT(*) FROM utilisateurs) AS total_utilisateurs,
            (SELECT COUNT(*) FROM competences) AS total_competences,
            (SELECT COUNT(*) FROM matchs WHERE matched = true) AS total_matchs
    `;
    db.query(sql, callback);
};

exports.getProfilsPublics = (callback) => {
    const sql = `
        SELECT id, prenom, bio, photo_profil
        FROM utilisateurs
        WHERE profil_public = 1
        ORDER BY id DESC
        LIMIT 30
    `;
    db.query(sql, callback);
};
