// controllers/push.controller.js

const Push = require('../models/push.model');

/**
 * ➕ Enregistrer un abonnement push pour l'utilisateur connecté
 * @route POST /api/push/inscription
 * @body { endpoint, p256dh, auth }
 */
exports.inscrireAuxNotifications = (req, res) => {
  const utilisateur_id = req.user.id;
  const { endpoint, p256dh, auth } = req.body;

  if (!endpoint || !p256dh || !auth) {
    return res.status(400).json({ message: "Données d'abonnement manquantes ou incomplètes" });
  }

  const data = {
    utilisateur_id,
    endpoint,
    p256dh,
    auth
  };

  Push.enregistrerAbonnement(data, (err) => {
    if (err) return res.status(500).json({ message: "Erreur lors de l'enregistrement de l'abonnement push" });
    res.status(201).json({ message: "Abonnement push enregistré avec succès" });
  });
};

/**
 * ❌ Supprimer l'abonnement push de l'utilisateur connecté
 * @route DELETE /api/push/desinscription
 */
exports.seDesinscrire = (req, res) => {
  const utilisateur_id = req.user.id;

  Push.supprimerAbonnement(utilisateur_id, (err) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la suppression de l'abonnement push" });
    res.status(200).json({ message: "Désinscription push réussie" });
  });
};
