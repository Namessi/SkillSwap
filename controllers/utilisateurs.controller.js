const Utilisateurs = require('../models/utilisateurs.model');

// Récupérer tous les utilisateurs (admin uniquement)
exports.getAllUtilisateurs = (req, res) => {
  Utilisateurs.getAll((err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json(results);
  });
};

// Récupérer un utilisateur par ID
exports.getUtilisateurById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  Utilisateurs.getById(id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    if (results.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(results[0]);
  });
};

// Mettre à jour un utilisateur
exports.updateUtilisateur = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nom, email } = req.body;

  if (!nom || !email) {
    return res.status(400).json({ message: 'Champs nom et email requis' });
  }

  Utilisateurs.update(id, { nom, email }, (err) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json({ message: 'Utilisateur mis à jour avec succès' });
  });
};

// Supprimer un utilisateur
exports.deleteUtilisateur = (req, res) => {
  const id = parseInt(req.params.id, 10);
  Utilisateurs.delete(id, (err) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json({ message: 'Utilisateur supprimé avec succès' });
  });
};
