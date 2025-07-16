const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notifications.controller');
const auth = require('../middleware/authmiddleware'); 

// 🔐 Protéger toutes les routes de notification par authentification
router.use(auth.verifyToken);

/**
 * 🔔 Récupérer les notifications non lues pour l'utilisateur connecté
 * GET /api/notifications/unread
 */
router.get('/unread', notificationsController.getUnreadNotifications);

/**
 * 📜 Récupérer toutes les notifications de l'utilisateur connecté
 * GET /api/notifications
 */
router.get('/', notificationsController.getAllNotifications);

/**
 * ✅ Marquer une notification comme lue
 * PATCH /api/notifications/:notificationId/read
 */
router.patch('/:notificationId/read', notificationsController.markAsRead);

/**
 * ❌ Supprimer une notification
 * DELETE /api/notifications/:notificationId
 */
router.delete('/:notificationId', notificationsController.deleteNotification);

/**
 * 🛠️ Créer une notification (optionnel — restreindre aux admins plus tard)
 * POST /api/notifications
 */
router.post('/', notificationsController.createNotification); // ⚠️ Ajouter middleware admin plus tard

module.exports = router;
