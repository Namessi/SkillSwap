// controllers/actualites.controller.js

const Actualites = require('../models/actualites.model');

/**
 * @route   GET /api/actualites
 * @desc    Récupérer les actualités personnalisées pour l’utilisateur connecté
 */
exports.getFluxActualites = (req, res) => {
  const utilisateur_id = req.user.id;

  Actualites.getActualitesPourUtilisateur(utilisateur_id, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur serveur lors du chargement du flux" });
    res.status(200).json(result);
  });
};

/**
 * @route   POST /api/actualites
 * @desc    Ajouter une nouvelle actualité
 */
exports.ajouterActualite = (req, res) => {
  const utilisateur_id = req.user.id;
  const { type, contenu } = req.body;

  if (!type || !contenu) {
    return res.status(400).json({ message: "Tous les champs sont requis (type, contenu)" });
  }

  const data = { utilisateur_id, type, contenu };

  Actualites.creerActualite(data, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de l’ajout de l’actualité" });

    res.status(201).json({
      message: "Actualité ajoutée avec succès",
      id: result.insertId
    });
  });
};

/**
 * @route   DELETE /api/actualites/:id
 * @desc    Supprimer une actualité si elle appartient à l’utilisateur connecté
 */
exports.supprimerActualite = (req, res) => {
  const actualite_id = req.params.id;
  const utilisateur_id = req.user.id;

  Actualites.supprimerActualite(actualite_id, utilisateur_id, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la suppression" });

    if (result.affectedRows === 0) {
      return res.status(403).json({ message: "Suppression refusée : vous n'êtes pas l'auteur" });
    }

    res.status(200).json({ message: "Actualité supprimée avec succès" });
  });
};
