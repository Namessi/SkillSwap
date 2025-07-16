const Visibilite = require('../models/visibilite.model');

exports.recupererEtat = (req, res) => {
    Visibilite.getVisibilite(req.user.id, (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur récupération", err });
        res.status(200).json({ profil_public: result[0].profil_public });
    });
};

exports.modifierEtat = (req, res) => {
    const { profil_public } = req.body;

    if (typeof profil_public !== 'boolean') {
        return res.status(400).json({ message: "Valeur booléenne requise (true / false)" });
    }

    Visibilite.setVisibilite(req.user.id, profil_public, (err) => {
        if (err) return res.status(500).json({ message: "Erreur mise à jour", err });
        res.status(200).json({ message: `Profil mis à jour. Visibilité : ${profil_public ? "publique" : "privée"}` });
    });
};
