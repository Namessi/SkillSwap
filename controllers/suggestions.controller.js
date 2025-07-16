const Suggestions = require('../models/suggestions.model');

exports.recupererSuggestions = (req, res) => {
    Suggestions.getSuggestionsPourUtilisateur(req.user.id, (err, resultats) => {
        if (err) return res.status(500).json({ message: "Erreur suggestions", err });
        res.status(200).json(resultats);
    });
};
