// Importation de la fonction d'initialisation de la connexion à la base de données
const initDBConnection = require('../database/dbConnection');
// Initialisation/réutilisation de la connexion à la base
const db = initDBConnection(); // ✅ Connexion réutilisée 

// Fonction pour récupérer la liste des compétences disponibles
exports.getCompetences = (callback) => {
    // Requête pour sélectionner les compétences triées par nom
    db.query('SELECT id, nom FROM competences ORDER BY nom ASC', callback);
};

// Fonction pour récupérer les tutoriels publics (accessibles à tous)
exports.getTutosPublics = (callback) => {
    // Requête pour sélectionner les tutoriels marqués comme publics, les plus récents en premier
    db.query('SELECT id, titre, resume, lien_video FROM tutoriels WHERE public = 1 ORDER BY id DESC LIMIT 50', callback);
};

// Fonction pour récupérer les statistiques globales de la plateforme
exports.getStats = (callback) => {
    const sql = `
        SELECT
            (SELECT COUNT(*) FROM utilisateurs) AS total_utilisateurs,
            (SELECT COUNT(*) FROM competences) AS total_competences,
            (SELECT COUNT(*) FROM matchs WHERE matched = true) AS total_matchs
    `;
    // Requête regroupant plusieurs compteurs : utilisateurs, compétences, matchs confirmés
    db.query(sql, callback);
};

// Fonction pour récupérer une liste de profils publics (visibles sans être connecté)
exports.getProfilsPublics = (callback) => {
    const sql = `
        SELECT id, prenom, bio, photo_profil
        FROM utilisateurs
        WHERE profil_public = 1
        ORDER BY id DESC
        LIMIT 30
    `;
    // Sélection des profils publics récents, avec informations essentielles
    db.query(sql, callback);
};
