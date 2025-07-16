const Signalement = require('../models/signalements.model');

// Récupérer tous les signalements (admin uniquement)
exports.getAllSignalements = (req, res) => {
  Signalement.getAll((err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.status(200).json(results);
  });
};

// Récupérer un signalement par ID (admin uniquement)
exports.getSignalementById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  Signalement.getById(id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    if (results.length === 0) {
      return res.status(404).json({ message: 'Signalement non trouvé' });
    }
    res.status(200).json(results[0]);
  });
};

// Créer un signalement (utilisateur connecté)
exports.createSignalement = (req, res) => {
  const utilisateur_id = req.user.id;
  const { type, description } = req.body;

  if (!type || !description) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  Signalement.create({ utilisateur_id, type, description }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.status(201).json({ message: 'Signalement créé avec succès', signalementId: result.insertId });
  });
};

// Supprimer un signalement (admin uniquement)
exports.deleteSignalement = (req, res) => {
  const id = parseInt(req.params.id, 10);

  Signalement.delete(id, (err) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.status(200).json({ message: 'Signalement supprimé avec succès' });
  });
};
