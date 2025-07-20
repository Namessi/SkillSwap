// database/dbconnection.js

const mysql = require('mysql2');
require('dotenv').config(); // 🔄 Charge les variables d’environnement

let db = null;

/**
 * Initialise une seule fois la connexion à la base de données MySQL
 * et la réutilise partout dans l’application
 */
function initDBConnection() {
  if (!db) {
    db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    db.connect((err) => {
      if (err) {
        console.error('❌ Erreur de connexion à MySQL :', err.message);
        process.exit(1);
      }
      console.log('✅ Connexion à MySQL réussie');
    });
  }

  return db;
}

// ✅ On exporte bien la fonction elle-même, pas son résultat
module.exports = initDBConnection;
