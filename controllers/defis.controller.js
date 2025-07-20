// controllers/defis.controller.js

const Defis = require('../models/defis.model');

/**
 * @route   GET /api/defis
 * @desc    Récupérer les défis hebdomadaires disponibles
 */
exports.getTousLesDefis = (req, res) => {
  Defis.getTous((err, defis) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la récupération des défis' });
    res.status(200).json(defis);
  });
};

/**
 * @route   POST /api/defis/valider
 * @desc    Valider un défi pour l’utilisateur connecté
 */
exports.validerDefi = (req, res) => {
  const utilisateur_id = req.user.id;
  const { defi_id } = req.body;

  if (!defi_id) {
    return res.status(400).json({ message: 'ID du défi requis' });
  }

  Defis.marquerCommeReussi(utilisateur_id, defi_id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la validation du défi' });

    res.status(200).json({ message: 'Défi validé avec succès' });
  });
};

/**
 * @route   GET /api/defis/historique
 * @desc    Voir les défis déjà validés par l’utilisateur connecté
 */
exports.getDefisValides = (req, res) => {
  const utilisateur_id = req.user.id;

  Defis.getValidesPourUtilisateur(utilisateur_id, (err, defis) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la récupération des défis validés' });
    res.status(200).json(defis);
  });
};
