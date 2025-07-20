// models/notifications.model.js

const initDBConnection = require('../database/dbConnection');
const db = initDBConnection(); // ✅ Connexion réutilisée 

const Notifications = {
  /**
   * ➕ Créer une notification
   * @param {Object} data - { user_id, type, message }
   */
  createNotification: (data, callback) => {
    const query = `
      INSERT INTO notifications (user_id, type, message, vue, date_creation) 
      VALUES (?, ?, ?, 0, NOW())
    `;
    const params = [data.user_id, data.type, data.message];
    db.query(query, params, callback);
  },

  /**
   * 🔔 Récupérer les notifications non lues d'un utilisateur
   * @param {number} userId
   */
  getUnreadNotifications: (userId, callback) => {
    const query = `
      SELECT * FROM notifications 
      WHERE user_id = ? AND vue = 0 
      ORDER BY date_creation DESC
    `;
    db.query(query, [userId], callback);
  },

  /**
   * 📋 Récupérer toutes les notifications d'un utilisateur
   * @param {number} userId
   */
  getAllNotifications: (userId, callback) => {
    const query = `
      SELECT * FROM notifications 
      WHERE user_id = ? 
      ORDER BY date_creation DESC
    `;
    db.query(query, [userId], callback);
  },

  /**
   * ✅ Marquer une notification comme lue
   * @param {number} notificationId
   * @param {number} userId
   */
  markAsRead: (notificationId, userId, callback) => {
    const query = `
      UPDATE notifications 
      SET vue = 1 
      WHERE id = ? AND user_id = ?
    `;
    db.query(query, [notificationId, userId], callback);
  },

  /**
   * ❌ Supprimer une notification
   * @param {number} notificationId
   * @param {number} userId
   */
  deleteNotification: (notificationId, userId, callback) => {
    const query = `
      DELETE FROM notifications 
      WHERE id = ? AND user_id = ?
    `;
    db.query(query, [notificationId, userId], callback);
  }
};

module.exports = Notifications;
