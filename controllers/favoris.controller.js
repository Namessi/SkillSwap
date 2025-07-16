// controllers/favoris.controller.js

const Favoris = require('../models/favoris.model');

/**
 * @route   POST /api/favoris
 * @desc    Ajouter un utilisateur aux favoris
 */
exports.addFavori = (req, res) => {
  const userId = req.user.id;
  const { favoriId } = req.body;

  if (!favoriId) {
    return res.status(400).json({ message: 'Le champ favoriId est requis' });
  }

  if (parseInt(favoriId) === userId) {
    return res.status(400).json({ message: 'Impossible de s’ajouter soi-même en favori' });
  }

  Favoris.add(userId, favoriId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de l’ajout du favori' });
    }

    res.status(201).json({ message: 'Favori ajouté avec succès' });
  });
};

/**
 * @route   DELETE /api/favoris/:favoriId
 * @desc    Supprimer un utilisateur des favoris
 */
exports.removeFavori = (req, res) => {
  const userId = req.user.id;
  const { favoriId } = req.params;

  Favoris.remove(userId, favoriId, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la suppression du favori' });
    }

    res.status(200).json({ message: 'Favori supprimé avec succès' });
  });
};

/**
 * @route   GET /api/favoris
 * @desc    Récupérer la liste des favoris de l'utilisateur connecté
 */
exports.listFavoris = (req, res) => {
  const userId = req.user.id;

  Favoris.findByUserId(userId, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la récupération des favoris' });
    }

    res.status(200).json(results);
  });
};
