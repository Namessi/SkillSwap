// controllers/notifications.controller.js

const Notifications = require('../models/notifications.model');

/**
 * ➕ Créer une notification (généralement utilisée par un admin ou service interne)
 */
exports.createNotification = (req, res) => {
  const { user_id, type, message } = req.body;

  if (!user_id || !type || !message) {
    return res.status(400).json({ message: 'user_id, type et message sont requis' });
  }

  Notifications.createNotification({ user_id, type, message }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la création de la notification' });
    }

    res.status(201).json({
      message: 'Notification créée',
      notificationId: result.insertId
    });
  });
};

/**
 * 🔔 Récupérer les notifications non lues de l'utilisateur connecté
 */
exports.getUnreadNotifications = (req, res) => {
  const userId = req.user.id;

  Notifications.getUnreadNotifications(userId, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la récupération des notifications non lues' });
    }

    res.status(200).json(results);
  });
};

/**
 * 📋 Récupérer toutes les notifications (lues et non lues)
 */
exports.getAllNotifications = (req, res) => {
  const userId = req.user.id;

  Notifications.getAllNotifications(userId, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la récupération des notifications' });
    }

    res.status(200).json(results);
  });
};

/**
 * ✅ Marquer une notification comme lue
 */
exports.markAsRead = (req, res) => {
  const userId = req.user.id;
  const notificationId = parseInt(req.params.notificationId, 10);

  Notifications.markAsRead(notificationId, userId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la mise à jour de la notification' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Notification non trouvée ou accès refusé' });
    }

    res.status(200).json({ message: 'Notification marquée comme lue' });
  });
};

/**
 * ❌ Supprimer une notification
 */
exports.deleteNotification = (req, res) => {
  const userId = req.user.id;
  const notificationId = parseInt(req.params.notificationId, 10);

  Notifications.deleteNotification(notificationId, userId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la suppression de la notification' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Notification non trouvée ou accès refusé' });
    }

    res.status(200).json({ message: 'Notification supprimée' });
  });
};
