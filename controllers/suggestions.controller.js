// Importation du modèle Suggestions qui contient la logique pour générer des suggestions personnalisées
const Suggestions = require('../models/suggestions.model');

// Contrôleur pour récupérer les suggestions d'utilisateurs pour l'utilisateur connecté
exports.recupererSuggestions = (req, res) => {
    // Appel de la méthode du modèle pour obtenir les suggestions en fonction de l'utilisateur connecté
    Suggestions.getSuggestionsPourUtilisateur(req.user.id, (err, resultats) => {
        // En cas d'erreur, renvoyer un message d'erreur avec le code 500
        if (err) return res.status(500).json({ message: "Erreur suggestions", err });
        // Sinon, renvoyer les suggestions obtenues
        res.status(200).json(resultats);
    });
};
