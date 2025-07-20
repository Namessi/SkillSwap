// Importation de la fonction d'initialisation de la connexion à la base de données
const initDBConnection = require('../database/dbConnection');
// Initialisation/réutilisation de la connexion à la base
const db = initDBConnection(); // ✅ Connexion réutilisée 

// Fonction pour ajouter plusieurs disponibilités pour un utilisateur
exports.ajouterDisponibilites = (utilisateur_id, disponibilites, callback) => {
    // Transformation de chaque disponibilité en tableau [utilisateur_id, jour, heure_debut, heure_fin]
    const values = disponibilites.map(d => [utilisateur_id, d.jour, d.heure_debut, d.heure_fin]);
    
    // Requête d'insertion multiple dans la table "disponibilites"
    const sql = `
        INSERT INTO disponibilites (utilisateur_id, jour, heure_debut, heure_fin)
        VALUES ?
    `;

    // Exécution de la requête avec toutes les disponibilités en une seule fois
    db.query(sql, [values], callback);
};

// Fonction pour supprimer toutes les disponibilités d’un utilisateur donné
exports.supprimerDisponibilitesUtilisateur = (utilisateur_id, callback) => {
    // Requête de suppression selon l'identifiant utilisateur
    db.query('DELETE FROM disponibilites WHERE utilisateur_id = ?', [utilisateur_id], callback);
};

// Fonction pour récupérer les disponibilités d’un utilisateur
exports.getDisponibilitesUtilisateur = (utilisateur_id, callback) => {
    // Requête de sélection des disponibilités d’un utilisateur
    db.query('SELECT jour, heure_debut, heure_fin FROM disponibilites WHERE utilisateur_id = ?', [utilisateur_id], callback);
};
