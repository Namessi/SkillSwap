const Disponibilite = require('../models/disponibilite.model');

exports.enregistrerDisponibilites = (req, res) => {
    const utilisateur_id = req.user.id;
    const disponibilites = req.body.disponibilites;

    if (!Array.isArray(disponibilites) || disponibilites.length === 0) {
        return res.status(400).json({ message: "Liste de disponibilités requise" });
    }

    // Supprimer les anciennes d’abord
    Disponibilite.supprimerDisponibilitesUtilisateur(utilisateur_id, (err) => {
        if (err) return res.status(500).json({ message: "Erreur suppression", err });

        // Ensuite ajouter les nouvelles
        Disponibilite.ajouterDisponibilites(utilisateur_id, disponibilites, (err) => {
            if (err) return res.status(500).json({ message: "Erreur ajout", err });
            res.status(200).json({ message: "Disponibilités enregistrées." });
        });
    });
};

exports.recupererDisponibilites = (req, res) => {
    Disponibilite.getDisponibilitesUtilisateur(req.user.id, (err, resultats) => {
        if (err) return res.status(500).json({ message: "Erreur récupération", err });
        res.status(200).json(resultats);
    });
};
