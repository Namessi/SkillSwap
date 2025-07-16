const db = require('../database/dbconnection');

const TableauDeBord = {
  // Compter le nombre total d'utilisateurs
  countUsers: (callback) => {
    const query = 'SELECT COUNT(*) AS total FROM utilisateurs';
    db.query(query, callback);
  },

  // Compter le nombre total de tickets de support
  countSupportTickets: (callback) => {
    const query = 'SELECT COUNT(*) AS total FROM support';
    db.query(query, callback);
  },

  // Compter le nombre total de messages envoyés
  countMessages: (callback) => {
    const query = 'SELECT COUNT(*) AS total FROM messages';
    db.query(query, callback);
  }
};

module.exports = TableauDeBord;
