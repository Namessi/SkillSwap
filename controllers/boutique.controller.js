// controllers/boutique.controller.js

const Boutique = require('../models/boutique.model');

/**
 * @route   GET /api/boutique
 * @desc    Récupérer les éléments disponibles dans la boutique
 */
exports.getArticles = (req, res) => {
  Boutique.getAll((err, articles) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la récupération des articles' });
    res.status(200).json(articles);
  });
};

/**
 * @route   POST /api/boutique/acheter
 * @desc    Acheter un article avec les points de l'utilisateur
 */
exports.acheterArticle = (req, res) => {
  const utilisateur_id = req.user.id;
  const { article_id } = req.body;

  if (!article_id) {
    return res.status(400).json({ message: "L'identifiant de l'article est requis" });
  }

  Boutique.acheter(utilisateur_id, article_id, (err, result) => {
    if (err) {
      if (err.code === 'POINTS_INSUFFISANTS') {
        return res.status(403).json({ message: 'Points insuffisants pour cet achat' });
      }
      return res.status(500).json({ message: 'Erreur lors de l\'achat' });
    }

    res.status(200).json({ message: 'Article acheté avec succès' });
  });
};
