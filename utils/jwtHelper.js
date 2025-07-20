// Importation du module jsonwebtoken pour la création et la vérification de tokens JWT
const jwt = require('jsonwebtoken');

/**
 * Génère un token JWT signé
 * @param {object} payload - Données à encoder (ex : { id, email, role })
 * @param {string|number} expiresIn - Durée de validité du token (ex: '1h', '7d')
 * @returns {string} - Token JWT signé
 */
const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Vérifie et décode un token JWT
 * @param {string} token - Token à valider
 * @returns {object} - Données contenues dans le token après vérification
 * @throws {Error} - En cas de token invalide ou expiré
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Exportation des fonctions pour les utiliser ailleurs dans l'application
module.exports = {
  generateToken,
  verifyToken,
};
