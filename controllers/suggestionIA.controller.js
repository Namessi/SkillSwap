// controllers/suggestionIA.controller.js

const SuggestionIA = require('../models/suggestionIA.model');

/**
 * @route   GET /api/suggestionsIA
 * @desc    Obtenir des suggestions intelligentes personnalisées pour l'utilisateur connecté
 */
exports.obtenirSuggestionsIA = (req, res) => {
  const utilisateur_id = req.user.id;

  SuggestionIA.genererSuggestions(utilisateur_id, (err, resultats) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la génération des suggestions", erreur: err });

    res.status(200).json(resultats);
  });
};

/**
 * @route   POST /api/suggestionsIA/ignorer
 * @desc    Marquer une suggestion IA comme ignorée
 */
exports.ignorerSuggestion = (req, res) => {
  const utilisateur_id = req.user.id;
  const { suggestion_id } = req.body;

  if (!suggestion_id) {
    return res.status(400).json({ message: "L'ID de la suggestion est requis" });
  }

  SuggestionIA.ignorerSuggestion(utilisateur_id, suggestion_id, (err) => {
    if (err) return res.status(500).json({ message: "Erreur lors de l'ignorance de la suggestion" });
    res.status(200).json({ message: "Suggestion ignorée avec succès" });
  });
};
