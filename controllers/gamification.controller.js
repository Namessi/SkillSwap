// controllers/gamification.controller.js

const Gamification = require('../models/gamification.model');

/**
 * @route   GET /api/gamification/points
 * @desc    Récupérer les points de l'utilisateur connecté
 */
exports.getPoints = (req, res) => {
  const userId = req.user.id;

  Gamification.getPointsByUser(userId, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.status(200).json(result[0]);
  });
};

/**
 * @route   POST /api/gamification/ajouter-points
 * @desc    Ajouter des points à l'utilisateur connecté
 */
exports.enregistrerAction = (req, res) => {
  const userId = req.user.id;
  const { points, raison } = req.body;

  if (!points || isNaN(points)) {
    return res.status(400).json({ message: 'Points invalides' });
  }

  Gamification.ajouterPoints(userId, points, raison, (err) => {
    if (err) return res.status(500).json({ message: 'Erreur ajout de points' });
    res.status(200).json({ message: 'Points ajoutés avec succès' });
  });
};

/**
 * @route   GET /api/gamification/classement
 * @desc    Obtenir le classement global ou par ville
 */
exports.getClassement = (req, res) => {
  const ville = req.query.ville || null;

  Gamification.getClassement(ville, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur classement' });
    res.status(200).json(result);
  });
};

/**
 * @route   GET /api/gamification/badges
 * @desc    Récupérer les badges obtenus par l'utilisateur
 */
exports.getBadges = (req, res) => {
  const userId = req.user.id;

  Gamification.getBadgesByUser(userId, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.status(200).json(result);
  });
};
