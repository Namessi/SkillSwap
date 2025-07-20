// controllers/traduction.controller.js

const Traduction = require('../models/traduction.model');

/**
 * @route   GET /api/traductions/:cle/:langue
 * @desc    Obtenir une traduction pour une clé et une langue
 */
exports.getTraduction = (req, res) => {
  const { cle, langue } = req.params;

  Traduction.getTraduction(cle, langue, (err, texte) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });

    if (!texte) {
      return res.status(404).json({ message: "Traduction introuvable" });
    }

    res.status(200).json({ cle, langue, texte });
  });
};

/**
 * @route   POST /api/traductions
 * @desc    Ajouter ou mettre à jour une traduction
 */
exports.ajouterOuMettreAJour = (req, res) => {
  const { cle, langue, texte } = req.body;

  if (!cle || !langue || !texte) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  Traduction.ajouterOuMettreAJourTraduction(cle, langue, texte, (err) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });

    res.status(200).json({ message: "Traduction enregistrée avec succès" });
  });
};

/**
 * @route   GET /api/traductions/:cle
 * @desc    Obtenir toutes les traductions d'une même clé
 */
exports.getToutesLanguesParCle = (req, res) => {
  const { cle } = req.params;

  Traduction.getToutesTraductionsParCle(cle, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });

    res.status(200).json(result);
  });
};

/**
 * @route   DELETE /api/traductions/:cle/:langue
 * @desc    Supprimer une traduction spécifique
 */
exports.supprimerTraduction = (req, res) => {
  const { cle, langue } = req.params;

  Traduction.supprimerTraduction(cle, langue, (err) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });

    res.status(200).json({ message: "Traduction supprimée" });
  });
};

/**
 * @route   GET /api/traductions
 * @desc    Lister toutes les traductions
 */
exports.listerToutesLesTraductions = (req, res) => {
  Traduction.getToutesLesTraductions((err, result) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });

    res.status(200).json(result);
  });
};
