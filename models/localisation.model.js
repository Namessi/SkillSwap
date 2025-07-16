const db = require('../database/dbConnection');

exports.ajouterLocalisation = (data, callback) => {
    const sql = `
        INSERT INTO localisations (utilisateur_id, latitude, longitude, last_seen, rayon_recherche, ville)
        VALUES (?, ?, ?, NOW(), ?, ?)
        ON DUPLICATE KEY UPDATE latitude = VALUES(latitude), longitude = VALUES(longitude), last_seen = NOW(), rayon_recherche = VALUES(rayon_recherche), ville = VALUES(ville)
    `;
    const params = [data.utilisateur_id, data.latitude, data.longitude, data.rayon_recherche, data.ville];
    db.query(sql, params, callback);
};

exports.getLocalisationParUtilisateur = (utilisateur_id, callback) => {
    db.query('SELECT * FROM localisations WHERE utilisateur_id = ?', [utilisateur_id], callback);
};

exports.getUtilisateursProches = (latitude, longitude, rayon, callback) => {
    const sql = `
        SELECT u.id, u.nom, u.prenom, l.latitude, l.longitude,
            (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(l.latitude)) *
            COS(RADIANS(l.longitude) - RADIANS(?)) + SIN(RADIANS(?)) * SIN(RADIANS(l.latitude)))) AS distance_km
        FROM utilisateurs u
        JOIN localisations l ON u.id = l.utilisateur_id
        HAVING distance_km <= ?
        ORDER BY distance_km ASC
    `;
    const params = [latitude, longitude, latitude, rayon];
    db.query(sql, params, callback);
};
