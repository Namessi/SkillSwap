const db = require('./dbconnection');
const util = require('util');

// Promisifier la méthode query de MySQL
const query = util.promisify(db.query).bind(db);

// Récupérer tous les utilisateurs
async function getAllUsers() {
  const sql = 'SELECT id, nom, email FROM utilisateurs';
  const rows = await query(sql);
  return rows;
}

// Ajouter un utilisateur
async function addUser(nom, email) {
  const sql = 'INSERT INTO utilisateurs (nom, email) VALUES (?, ?)';
  const result = await query(sql, [nom, email]);
  return result.insertId;
}

// Mettre à jour l’email d’un utilisateur
async function updateUserEmail(id, newEmail) {
  const sql = 'UPDATE utilisateurs SET email = ? WHERE id = ?';
  const result = await query(sql, [newEmail, id]);
  return result.affectedRows;
}

// Supprimer un utilisateur
async function deleteUser(id) {
  const sql = 'DELETE FROM utilisateurs WHERE id = ?';
  const result = await query(sql, [id]);
  return result.affectedRows;
}

module.exports = {
  getAllUsers,
  addUser,
  updateUserEmail,
  deleteUser,
};
