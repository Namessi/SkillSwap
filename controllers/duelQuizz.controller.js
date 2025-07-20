// controllers/duelQuizz.controller.js

const DuelQuizz = require('../models/duelQuizz.model');

/**
 * ➕ Créer un duel entre deux utilisateurs
 * @route   POST /api/duel
 * @desc    L'utilisateur connecté lance un duel contre un autre utilisateur sur un quizz
 */
exports.creerDuel = (req, res) => {
  const { adversaire_id, quizz_id } = req.body;
  const utilisateur_id = req.user.id;

  if (!adversaire_id || !quizz_id) {
    return res.status(400).json({ message: 'Adversaire et quiz requis' });
  }

  const data = { utilisateur_id, adversaire_id, quizz_id };

  DuelQuizz.creerDuel(data, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la création du duel' });
    res.status(201).json({ message: 'Duel créé avec succès', duel_id: result.insertId });
  });
};

/**
 * ✅ Répondre à un duel en cours
 * @route   POST /api/duel/:id/repondre
 * @desc    L'utilisateur connecté envoie sa réponse à une question du duel
 */
exports.repondreDuel = (req, res) => {
  const duel_id = req.params.id;
  const utilisateur_id = req.user.id;
  const { reponse, correcte } = req.body;

  if (typeof correcte !== 'boolean') {
    return res.status(400).json({ message: 'Veuillez indiquer si la réponse est correcte ou non' });
  }

  DuelQuizz.repondreDuel({ duel_id, utilisateur_id, reponse, correcte }, (err) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la réponse au duel' });
    res.status(200).json({ message: 'Réponse enregistrée avec succès' });
  });
};

/**
 * 📋 Récupérer les duels de l’utilisateur connecté
 * @route   GET /api/duel
 * @desc    Lister tous les duels (en cours ou terminés) de l’utilisateur connecté
 */
exports.getDuelsUtilisateur = (req, res) => {
  const utilisateur_id = req.user.id;

  DuelQuizz.getDuelsUtilisateur(utilisateur_id, (err, rows) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la récupération des duels' });
    res.status(200).json(rows);
  });
};
