const jwt = require('jsonwebtoken');

/**
 * Génère un token JWT signé
 * @param {object} payload - Données à encoder (ex : { id, email, role })
 * @param {string|number} expiresIn - Durée de validité (ex: '1h', '7d')
 * @returns {string} - Token signé
 */
const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Vérifie et décode un token JWT
 * @param {string} token - Token à valider
 * @returns {object} - Données décodées
 * @throws {Error} - Si le token est invalide ou expiré
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
