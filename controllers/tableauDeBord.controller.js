const TableauDeBord = require('../models/tableauDeBord.model');

// Récupérer les statistiques globales pour le tableau de bord
exports.getStats = (req, res) => {
  TableauDeBord.countUsers((err, usersResult) => {
    if (err) return res.status(500).json({ message: 'Erreur lors du comptage des utilisateurs' });

    TableauDeBord.countSupportTickets((err, supportResult) => {
      if (err) return res.status(500).json({ message: 'Erreur lors du comptage des tickets support' });

      TableauDeBord.countMessages((err, messagesResult) => {
        if (err) return res.status(500).json({ message: 'Erreur lors du comptage des messages' });

        res.status(200).json({
          utilisateurs: usersResult[0].total,
          tickets_support: supportResult[0].total,
          messages: messagesResult[0].total
        });
      });
    });
  });
};
