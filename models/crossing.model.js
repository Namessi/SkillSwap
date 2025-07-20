const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

// Vérifie les utilisateurs dans le rayon < seuil
exports.detecterCroisements = (id, latitude, longitude, seuil_m, callback) => {
    const sql = `
        SELECT l.utilisateur_id, l.latitude, l.longitude,
            (6371000 * ACOS(COS(RADIANS(?)) * COS(RADIANS(l.latitude)) *
            COS(RADIANS(l.longitude) - RADIANS(?)) + SIN(RADIANS(?)) * SIN(RADIANS(l.latitude)))) AS distance_m
        FROM localisations l
        WHERE l.utilisateur_id != ?
          AND l.last_seen >= NOW() - INTERVAL 15 MINUTE
        HAVING distance_m < ?
    `;
    db.query(sql, [latitude, longitude, latitude, id, seuil_m], callback);
};

// Enregistre un croisement
exports.enregistrerCroisement = (a, b, distance, callback) => {
    const sql = `
        INSERT IGNORE INTO crossings (utilisateur_a, utilisateur_b, distance_m)
        VALUES (?, ?, ?)
    `;
    db.query(sql, [a, b, distance], callback);
};

// Liste des profils croisés
exports.getProfilsCroisés = (utilisateur_id, callback) => {
    const sql = `
        SELECT u.id, u.nom, u.prenom, u.photo_profil, c.date_croisement, c.distance_m
        FROM crossings c
        JOIN utilisateurs u ON u.id = c.utilisateur_b
        WHERE c.utilisateur_a = ?
        ORDER BY c.date_croisement DESC
    `;
    db.query(sql, [utilisateur_id], callback);
};
