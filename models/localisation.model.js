// Importation de la fonction d'initialisation de la connexion à la base de données
const initDBConnection = require('../database/dbConnection');
// Initialisation/réutilisation de la connexion à la base
const db = initDBConnection(); // ✅ Connexion réutilisée 

// Fonction pour ajouter ou mettre à jour la localisation d’un utilisateur
exports.ajouterLocalisation = (data, callback) => {
    const sql = `
        INSERT INTO localisations (utilisateur_id, latitude, longitude, last_seen, rayon_recherche, ville)
        VALUES (?, ?, ?, NOW(), ?, ?)
        ON DUPLICATE KEY UPDATE latitude = VALUES(latitude), longitude = VALUES(longitude), last_seen = NOW(), rayon_recherche = VALUES(rayon_recherche), ville = VALUES(ville)
    `;
    // Paramètres de la requête : coordonnées, rayon, ville
    const params = [data.utilisateur_id, data.latitude, data.longitude, data.rayon_recherche, data.ville];

    // Exécution de la requête (insert ou mise à jour si la localisation existe déjà)
    db.query(sql, params, callback);
};

// Fonction pour récupérer la localisation d’un utilisateur spécifique
exports.getLocalisationParUtilisateur = (utilisateur_id, callback) => {
    // Requête de sélection par ID utilisateur
    db.query('SELECT * FROM localisations WHERE utilisateur_id = ?', [utilisateur_id], callback);
};

// Fonction pour récupérer les utilisateurs proches géographiquement
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
    // Paramètres : latitude et longitude de l'utilisateur courant + rayon de recherche
    const params = [latitude, longitude, latitude, rayon];

    // Exécution de la requête avec les paramètres
    db.query(sql, params, callback);
};
