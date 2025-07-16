const db = require('../database/dbConnection');

// Ajouter un like ou superlike
exports.envoyerLike = (data, callback) => {
    const { utilisateur_1, utilisateur_2, type_like } = data;

    const sql = `
        INSERT INTO matchs (utilisateur_1, utilisateur_2, type_like)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE type_like = VALUES(type_like)
    `;
    db.query(sql, [utilisateur_1, utilisateur_2, type_like], callback);
};

// Vérifier si match réciproque
exports.verifierMatch = (utilisateur_1, utilisateur_2, callback) => {
    const sql = `
        SELECT * FROM matchs
        WHERE utilisateur_1 = ? AND utilisateur_2 = ?
    `;
    db.query(sql, [utilisateur_2, utilisateur_1], callback); // inverse pour vérifier si l'autre a déjà liké
};

// Mettre à jour matched = true
exports.confirmerMatch = (utilisateur_1, utilisateur_2, callback) => {
    const sql = `
        UPDATE matchs
        SET matched = true
        WHERE (utilisateur_1 = ? AND utilisateur_2 = ?)
           OR (utilisateur_1 = ? AND utilisateur_2 = ?)
    `;
    db.query(sql, [utilisateur_1, utilisateur_2, utilisateur_2, utilisateur_1], callback);
};

// Suggestions : utilisateurs pas encore likés, proches, compatibles
exports.suggestions = (id, latitude, longitude, rayon, callback) => {
    const sql = `
        SELECT u.id, u.nom, u.prenom, u.bio,
            (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(l.latitude)) *
            COS(RADIANS(l.longitude) - RADIANS(?)) + SIN(RADIANS(?)) * SIN(RADIANS(l.latitude)))) AS distance_km
        FROM utilisateurs u
        JOIN localisations l ON u.id = l.utilisateur_id
        WHERE u.id != ?
          AND u.id NOT IN (
              SELECT utilisateur_2 FROM matchs WHERE utilisateur_1 = ?
          )
        HAVING distance_km <= ?
        ORDER BY distance_km ASC
        LIMIT 20
    `;
    db.query(sql, [latitude, longitude, latitude, id, id, rayon], callback);
};

exports.getHistoriqueMatchs = (utilisateur_id, callback) => {
    const sql = `
        SELECT u.id, u.nom, u.prenom, u.photo_profil, m.date_like, m.type_like
        FROM matchs m
        JOIN utilisateurs u
          ON u.id = CASE
              WHEN m.utilisateur_1 = ? THEN m.utilisateur_2
              ELSE m.utilisateur_1
          END
        WHERE matched = true
          AND (m.utilisateur_1 = ? OR m.utilisateur_2 = ?)
        ORDER BY m.date_like DESC
    `;
    db.query(sql, [utilisateur_id, utilisateur_id, utilisateur_id], callback);
};
