// controllers/competence.controller.js

const Competence = require('../models/competence.model');

/**
 * @route   GET /api/competences
 * @desc    Récupérer toutes les compétences de l'utilisateur connecté
 */
exports.getAllCompetences = (req, res) => {
  const userId = req.user.id;

  Competence.getAllByUser(userId, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.status(200).json(result);
  });
};

/**
 * @route   GET /api/competences/:id
 * @desc    Récupérer une compétence spécifique par ID
 */
exports.getCompetenceById = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  Competence.getByIdAndUser(id, userId, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    if (result.length === 0) return res.status(404).json({ message: 'Compétence non trouvée' });

    res.status(200).json(result[0]);
  });
};

/**
 * @route   POST /api/competences
 * @desc    Ajouter une compétence à l'utilisateur connecté
 */
exports.createCompetence = (req, res) => {
  const userId = req.user.id;
  const { nom, description } = req.body;

  if (!nom) {
    return res.status(400).json({ message: 'Le nom de la compétence est requis' });
  }

  const data = {
    nom,
    description: description || '',
    user_id: userId
  };

  Competence.create(data, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });

    res.status(201).json({
      message: 'Compétence créée avec succès',
      id: result.insertId
    });
  });
};

/**
 * @route   PUT /api/competences/:id
 * @desc    Modifier une compétence de l'utilisateur
 */
exports.updateCompetence = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { nom, description } = req.body;

  Competence.getByIdAndUser(id, userId, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    if (result.length === 0) return res.status(404).json({ message: 'Compétence non trouvée ou non autorisée' });

    const updatedData = {
      nom: nom || result[0].nom,
      description: description || result[0].description
    };

    Competence.update(id, updatedData, (err) => {
      if (err) return res.status(500).json({ message: 'Erreur mise à jour' });
      res.status(200).json({ message: 'Compétence mise à jour avec succès' });
    });
  });
};

/**
 * @route   DELETE /api/competences/:id
 * @desc    Supprimer une compétence
 */
exports.deleteCompetence = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  Competence.getByIdAndUser(id, userId, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    if (result.length === 0) return res.status(404).json({ message: 'Compétence non trouvée ou non autorisée' });

    Competence.delete(id, (err) => {
      if (err) return res.status(500).json({ message: 'Erreur suppression' });
      res.status(200).json({ message: 'Compétence supprimée avec succès' });
    });
  });
};
