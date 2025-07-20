// Importation du modèle Disponibilite qui gère l'enregistrement et la récupération des disponibilités des utilisateurs
const Disponibilite = require('../models/disponibilite.model');

// Contrôleur pour enregistrer les disponibilités d’un utilisateur
exports.enregistrerDisponibilites = (req, res) => {
    // Récupération de l'ID de l'utilisateur à partir du token
    const utilisateur_id = req.user.id;
    // Récupération des disponibilités envoyées dans le corps de la requête
    const disponibilites = req.body.disponibilites;

    // Vérifie que les disponibilités sont bien fournies sous forme de tableau non vide
    if (!Array.isArray(disponibilites) || disponibilites.length === 0) {
        return res.status(400).json({ message: "Liste de disponibilités requise" });
    }

    // Étape 1 : suppression des disponibilités précédentes de l'utilisateur
    Disponibilite.supprimerDisponibilitesUtilisateur(utilisateur_id, (err) => {
        // En cas d'erreur lors de la suppression, retourne une erreur 500
        if (err) return res.status(500).json({ message: "Erreur suppression", err });

        // Étape 2 : ajout des nouvelles disponibilités
        Disponibilite.ajouterDisponibilites(utilisateur_id, disponibilites, (err) => {
            // En cas d'erreur lors de l'ajout, retourne une erreur 500
            if (err) return res.status(500).json({ message: "Erreur ajout", err });
            // Si tout est OK, retourne un message de confirmation
            res.status(200).json({ message: "Disponibilités enregistrées." });
        });
    });
};

// Contrôleur pour récupérer les disponibilités de l'utilisateur connecté
exports.recupererDisponibilites = (req, res) => {
    // Appel de la méthode du modèle pour obtenir les disponibilités
    Disponibilite.getDisponibilitesUtilisateur(req.user.id, (err, resultats) => {
        // En cas d'erreur, retourne une erreur 500
        if (err) return res.status(500).json({ message: "Erreur récupération", err });
        // Sinon, retourne les disponibilités récupérées
        res.status(200).json(resultats);
    });
};
