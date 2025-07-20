// Importation de la fonction d'initialisation de la connexion à la base de données
const initDBConnection = require('../database/dbConnection');
// Initialisation/réutilisation de la connexion à la base
const db = initDBConnection(); // ✅ Connexion réutilisée 

// Fonction pour récupérer l'état de visibilité (publique ou privée) du profil d'un utilisateur
exports.getVisibilite = (utilisateur_id, callback) => {
    // Requête SQL pour sélectionner la colonne "profil_public" de l'utilisateur donné
    db.query('SELECT profil_public FROM utilisateurs WHERE id = ?', [utilisateur_id], callback);
};

// Fonction pour modifier l'état de visibilité (true/false) du profil d'un utilisateur
exports.setVisibilite = (utilisateur_id, etat, callback) => {
    // Requête SQL pour mettre à jour la colonne "profil_public" pour l'utilisateur spécifié
    db.query('UPDATE utilisateurs SET profil_public = ? WHERE id = ?', [etat, utilisateur_id], callback);
};
