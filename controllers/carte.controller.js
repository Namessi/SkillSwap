const Carte = require('../models/carte.model');

exports.profilsSurCarte = (req, res) => {
    const { latitude, longitude, rayon } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: "Latitude et longitude requises." });
    }

    Carte.obtenirUtilisateursCarte(latitude, longitude, rayon || 50, (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur serveur", erreur: err });
        res.status(200).json(results);
    });
};
