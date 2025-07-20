// Importation de la fonction d'initialisation de la connexion à la base de données
const initDBConnection = require('../database/dbConnection');
// Initialisation/réutilisation de la connexion à la base
const db = initDBConnection(); // ✅ Connexion réutilisée 

// Fonction pour bloquer un utilisateur (en ignorant les doublons avec INSERT IGNORE)
exports.bloquerUtilisateur = (bloqueur_id, bloque_id, callback) => {
    const sql = `
        INSERT IGNORE INTO blocages (bloqueur_id, bloque_id)
        VALUES (?, ?)
    `;
    // Exécution de la requête SQL avec les IDs fournis
    db.query(sql, [bloqueur_id, bloque_id], callback);
};

// Fonction pour débloquer un utilisateur
exports.debloquerUtilisateur = (bloqueur_id, bloque_id, callback) => {
    // Suppression de l’entrée dans la table blocages entre deux utilisateurs
    db.query('DELETE FROM blocages WHERE bloqueur_id = ? AND bloque_id = ?', [bloqueur_id, bloque_id], callback);
};

// Fonction pour vérifier si deux utilisateurs sont mutuellement bloqués
exports.estBloque = (userA, userB, callback) => {
    const sql = `
        SELECT * FROM blocages
        WHERE (bloqueur_id = ? AND bloque_id = ?)
           OR (bloqueur_id = ? AND bloque_id = ?)
    `;
    // Vérifie s'il y a un blocage dans un sens ou dans l'autre
    db.query(sql, [userA, userB, userB, userA], callback);
};

// Fonction pour récupérer la liste des utilisateurs bloqués par un utilisateur
exports.getBlocagesUtilisateur = (id, callback) => {
    const sql = `
        SELECT u.id, u.nom, u.prenom, b.date_blocage
        FROM blocages b
        JOIN utilisateurs u ON u.id = b.bloque_id
        WHERE b.bloqueur_id = ?
    `;
    // Retourne les informations des utilisateurs bloqués ainsi que la date de blocage
    db.query(sql, [id], callback);
};
