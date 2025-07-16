const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

/**
 * Hash un mot de passe en utilisant bcrypt
 * @param {string} plainPassword - Mot de passe en clair
 * @returns {Promise<string>} - Le mot de passe hashé
 */
const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
};

/**
 * Compare un mot de passe en clair avec un hash bcrypt
 * @param {string} plainPassword - Mot de passe en clair
 * @param {string} hashedPassword - Mot de passe hashé à comparer
 * @returns {Promise<boolean>} - true si correspond, false sinon
 */
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
