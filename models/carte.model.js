// Importation de la fonction d'initialisation de la connexion à la base de données
const initDBConnection = require('../database/dbConnection');
// Initialisation/réutilisation de la connexion à la base
const db = initDBConnection(); // ✅ Connexion réutilisée 

// Fonction pour obtenir les utilisateurs à proximité sur la carte en fonction des coordonnées fournies
exports.obtenirUtilisateursCarte = (latitude, longitude, rayon, callback) => {
    // Requête SQL pour sélectionner les utilisateurs visibles (profil_public = 1)
    // et calculer leur distance (en km) par rapport à une position donnée
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

    // Paramètres pour la requête SQL : latitude (x2), longitude, et rayon max
    const params = [latitude, longitude, latitude, rayon];

    // Exécution de la requête avec les paramètres fournis
    db.query(sql, params, callback);
};
