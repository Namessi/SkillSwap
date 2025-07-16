const mysql = require('mysql2');
require('dotenv').config(); // Chargement des variables d’environnement

// Création de la connexion à la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,           // Adresse du serveur MySQL
  user: process.env.DB_USER,           // Nom d'utilisateur
  password: process.env.DB_PASSWORD,   // Mot de passe
  database: process.env.DB_NAME        // Nom de la base
});

// Vérification de la connexion
db.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion à MySQL :', err.message);
    process.exit(1); // Arrêt du processus
  }
  console.log('✅ Connexion à MySQL réussie');
});

// Exportation de la connexion
module.exports = db;
