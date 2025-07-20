// controllers/agenda.controller.js

const Agenda = require('../models/agenda.model');

/**
 * ➕ Créer un événement dans l’agenda de l’utilisateur connecté
 * @route POST /api/agenda
 * @access Privé (utilisateur connecté)
 */
exports.creerEvenement = (req, res) => {
  const utilisateur_id = req.user.id;
  const { titre, description, date, heure_debut, heure_fin } = req.body;

  // Vérification des champs requis
  if (!titre || !date || !heure_debut || !heure_fin) {
    return res.status(400).json({ message: 'Champs requis manquants' });
  }

  // Enregistrement de l’événement
  Agenda.creerEvenement({ utilisateur_id, titre, description, date, heure_debut, heure_fin }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la création de l’événement' });

    res.status(201).json({
      message: 'Événement créé avec succès',
      id: result.insertId
    });
  });
};

/**
 * 📅 Récupérer tous les événements de l’agenda de l’utilisateur connecté
 * @route GET /api/agenda
 * @access Privé (utilisateur connecté)
 */
exports.getEvenementsUtilisateur = (req, res) => {
  const utilisateur_id = req.user.id;

  Agenda.getEvenementsUtilisateur(utilisateur_id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la récupération' });

    res.status(200).json(result);
  });
};

/**
 * ❌ Supprimer un événement spécifique (si propriétaire)
 * @route DELETE /api/agenda/:id
 * @access Privé (utilisateur connecté)
 */
exports.supprimerEvenement = (req, res) => {
  const utilisateur_id = req.user.id;
  const { id } = req.params;

  Agenda.supprimerEvenement(id, utilisateur_id, (err, affectedRows) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la suppression' });

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Événement introuvable ou non autorisé' });
    }

    res.status(200).json({ message: 'Événement supprimé avec succès' });
  });
};
