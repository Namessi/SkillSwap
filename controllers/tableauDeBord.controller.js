// Importation du modèle TableauDeBord qui contient les méthodes pour extraire des statistiques globales
const TableauDeBord = require('../models/tableauDeBord.model');

// Contrôleur pour récupérer les statistiques globales à afficher dans le tableau de bord
exports.getStats = (req, res) => {
  // Appel de la méthode pour compter le nombre total d'utilisateurs
  TableauDeBord.countUsers((err, usersResult) => {
    // En cas d'erreur, on renvoie une réponse d'erreur 500
    if (err) return res.status(500).json({ message: 'Erreur lors du comptage des utilisateurs' });

    // Appel de la méthode pour compter le nombre total de tickets de support
    TableauDeBord.countSupportTickets((err, supportResult) => {
      // En cas d'erreur, on renvoie une réponse d'erreur 500
      if (err) return res.status(500).json({ message: 'Erreur lors du comptage des tickets support' });

      // Appel de la méthode pour compter le nombre total de messages échangés
      TableauDeBord.countMessages((err, messagesResult) => {
        // En cas d'erreur, on renvoie une réponse d'erreur 500
        if (err) return res.status(500).json({ message: 'Erreur lors du comptage des messages' });

        // Si tout s’est bien passé, on renvoie les statistiques agrégées
        res.status(200).json({
          utilisateurs: usersResult[0].total,        // Total des utilisateurs
          tickets_support: supportResult[0].total,    // Total des tickets de support
          messages: messagesResult[0].total           // Total des messages
        });
      });
    });
  });
};
