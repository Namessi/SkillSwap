const db = require('../database/dbConnection');

exports.obtenirUtilisateursCarte = (latitude, longitude, rayon, callback) => {
    const sql = `
        SELECT u.id, u.nom, u.prenom, u.photo_profil, u.bio,
               l.latitude, l.longitude,
               (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(l.latitude)) *
               COS(RADIANS(l.longitude) - RADIANS(?)) + SIN(RADIANS(?)) * SIN(RADIANS(l.latitude)))) AS distance_km
        FROM utilisateurs u
        JOIN localisations l ON u.id = l.utilisateur_id
        WHERE u.profil_public = 1
        HAVING distance_km <= ?
        ORDER BY distance_km ASC
    `;
    const params = [latitude, longitude, latitude, rayon];
    db.query(sql, params, callback);
};
