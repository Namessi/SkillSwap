const Tutoriels = require('../models/tutoriels.model');

// Récupérer tous les tutoriels
exports.getAllTutoriels = (req, res) => {
  Tutoriels.getAll((err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur lors de la récupération des tutoriels' });
    res.json(results);
  });
};

// Récupérer un tutoriel par ID
exports.getTutorielById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  Tutoriels.getById(id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur lors de la récupération du tutoriel' });
    if (results.length === 0) return res.status(404).json({ message: 'Tutoriel non trouvé' });

    res.json(results[0]);
  });
};

// Créer un nouveau tutoriel
exports.createTutoriel = (req, res) => {
  const { titre, contenu, categorie, url_video } = req.body;

  if (!titre || !contenu || !categorie) {
    return res.status(400).json({ message: 'Champs requis : titre, contenu, categorie' });
  }

  Tutoriels.create({ titre, contenu, categorie, url_video }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur lors de la création du tutoriel' });

    res.status(201).json({ message: 'Tutoriel ajouté avec succès', tutorielId: result.insertId });
  });
};

// Modifier un tutoriel existant
exports.updateTutoriel = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { titre, contenu, categorie, url_video } = req.body;

  if (!titre || !contenu || !categorie) {
    return res.status(400).json({ message: 'Champs requis : titre, contenu, categorie' });
  }

  Tutoriels.update(id, { titre, contenu, categorie, url_video }, (err) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du tutoriel' });

    res.json({ message: 'Tutoriel mis à jour avec succès' });
  });
};

// Supprimer un tutoriel
exports.deleteTutoriel = (req, res) => {
  const id = parseInt(req.params.id, 10);

  Tutoriels.delete(id, (err) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur lors de la suppression du tutoriel' });

    res.json({ message: 'Tutoriel supprimé avec succès' });
  });
};
