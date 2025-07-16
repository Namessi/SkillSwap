// controllers/abonnements.controller.js

const Abonnement = require('../models/abonnements.model');

/**
 * @route   POST /api/abonnements
 * @desc    Créer un abonnement pour l'utilisateur connecté
 */
exports.createAbonnement = (req, res) => {
  const userId = req.user.id;
  const { type, date_debut, date_fin } = req.body;

  if (!type || !date_debut || !date_fin) {
    return res.status(400).json({ message: "Champs requis : type, date_debut, date_fin" });
  }

  const data = {
    user_id: userId,
    type,
    date_debut,
    date_fin
  };

  Abonnement.create(data, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la création de l’abonnement' });
    }
    res.status(201).json({
      message: 'Abonnement créé avec succès',
      abonnementId: result.insertId
    });
  });
};

/**
 * @route   GET /api/abonnements
 * @desc    Récupérer tous les abonnements de l’utilisateur connecté
 */
exports.getAllAbonnements = (req, res) => {
  const userId = req.user.id;

  Abonnement.getByUserId(userId, (err, abonnements) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la récupération des abonnements' });
    }
    res.status(200).json(abonnements);
  });
};

/**
 * @route   GET /api/abonnements/:id
 * @desc    Récupérer un abonnement par ID
 */
exports.getAbonnementById = (req, res) => {
  const id = req.params.id;

  Abonnement.getById(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la récupération de l’abonnement' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Abonnement non trouvé' });
    }

    // Vérification que l’abonnement appartient à l’utilisateur connecté
    if (result[0].user_id !== req.user.id) {
      return res.status(403).json({ message: "Accès refusé à cet abonnement" });
    }

    res.status(200).json(result[0]);
  });
};

/**
 * @route   DELETE /api/abonnements/:id
 * @desc    Supprimer un abonnement
 */
exports.deleteAbonnement = (req, res) => {
  const id = req.params.id;

  Abonnement.getById(id, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur récupération abonnement" });
    if (result.length === 0) return res.status(404).json({ message: "Abonnement non trouvé" });

    if (result[0].user_id !== req.user.id) {
      return res.status(403).json({ message: "Accès interdit" });
    }

    Abonnement.delete(id, (err) => {
      if (err) return res.status(500).json({ message: 'Erreur lors de la suppression' });
      res.status(200).json({ message: 'Abonnement supprimé avec succès' });
    });
  });
};
