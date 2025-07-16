const Crossing = require('../models/crossing.model');

exports.enregistrerCroisements = (req, res) => {
    const id = req.user.id;
    const { latitude, longitude } = req.body;
    const seuil_m = 100;

    Crossing.detecterCroisements(id, latitude, longitude, seuil_m, (err, resultats) => {
        if (err) return res.status(500).json({ message: "Erreur détection", err });

        resultats.forEach(croisement => {
            Crossing.enregistrerCroisement(id, croisement.utilisateur_id, croisement.distance_m, () => {});
        });

        res.status(200).json({ message: "Croisements analysés", croisés: resultats.length });
    });
};

exports.recupererCroisements = (req, res) => {
    Crossing.getProfilsCroisés(req.user.id, (err, data) => {
        if (err) return res.status(500).json({ message: "Erreur récupération", err });
        res.status(200).json(data);
    });
};
