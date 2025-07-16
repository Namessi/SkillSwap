const Localisation = require('../models/localisation.model');

exports.mettreAJourLocalisation = (req, res) => {
    const data = {
        utilisateur_id: req.user.id,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        rayon_recherche: req.body.rayon_recherche || 50,
        ville: req.body.ville || null
    };
    
    const Crossing = require('../models/crossing.model');
Crossing.detecterCroisements(data.utilisateur_id, data.latitude, data.longitude, 100, (err, resultats) => {
    if (!err && resultats.length) {
        resultats.forEach(croisement => {
            Crossing.enregistrerCroisement(data.utilisateur_id, croisement.utilisateur_id, croisement.distance_m, () => {});
        });
    }
});

    Localisation.ajouterLocalisation(data, (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur serveur", erreur: err });
        res.status(200).json({ message: "Localisation mise à jour." });
    });
};

exports.recupererLocalisation = (req, res) => {
    Localisation.getLocalisationParUtilisateur(req.user.id, (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur", erreur: err });
        res.status(200).json(result[0]);
    });
};

exports.utilisateursProches = (req, res) => {
    const { latitude, longitude, rayon } = req.query;
    Localisation.getUtilisateursProches(latitude, longitude, rayon || 50, (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur serveur", erreur: err });
        res.status(200).json(results);
    });
};
