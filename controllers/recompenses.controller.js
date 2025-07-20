// controllers/recompenses.controller.js

const Recompense = require('../models/recompenses.model');

/**
 * @route   GET /api/recompenses
 * @desc    Récupérer toutes les récompenses disponibles
 */
exports.getRecompensesDisponibles = (req, res) => {
  Recompense.getAllDisponibles((err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.status(200).json(result);
  });
};

/**
 * @route   GET /api/recompenses/utilisateur
 * @desc    Récupérer les récompenses obtenues par l'utilisateur connecté
 */
exports.getRecompensesUtilisateur = (req, res) => {
  const userId = req.user.id;

  Recompense.getByUser(userId, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.status(200).json(result);
  });
};

/**
 * @route   POST /api/recompenses/obtenir
 * @desc    Permet à l'utilisateur d'obtenir une récompense (avec ses points)
 */
exports.obtenirRecompense = (req, res) => {
  const userId = req.user.id;
  const { recompense_id } = req.body;

  if (!recompense_id) return res.status(400).json({ message: 'ID de la récompense requis' });

  Recompense.attribuerAUtilisateur(userId, recompense_id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de l’attribution' });

    res.status(200).json({ message: 'Récompense obtenue avec succès', result });
  });
};
