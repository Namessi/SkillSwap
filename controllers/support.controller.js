const Support = require('../models/support.model');

// Récupérer tous les tickets
exports.getAllTickets = (req, res) => {
  Support.getAll((err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la récupération des tickets' });
    res.status(200).json(results);
  });
};

// Récupérer un ticket par ID
exports.getTicketById = (req, res) => {
  const id = req.params.id;

  Support.getById(id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la récupération du ticket' });
    if (results.length === 0) return res.status(404).json({ message: 'Ticket non trouvé' });

    res.status(200).json(results[0]);
  });
};

// Créer un ticket de support
exports.createTicket = (req, res) => {
  const { utilisateur_id, sujet, message } = req.body;

  if (!utilisateur_id || !sujet || !message) {
    return res.status(400).json({ message: 'Champs utilisateur_id, sujet et message requis' });
  }

  Support.create({ utilisateur_id, sujet, message }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la création du ticket' });

    res.status(201).json({ message: 'Ticket créé avec succès', ticketId: result.insertId });
  });
};

// Supprimer un ticket de support
exports.deleteTicket = (req, res) => {
  const id = req.params.id;

  Support.delete(id, (err) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la suppression du ticket' });

    res.status(200).json({ message: 'Ticket supprimé avec succès' });
  });
};
