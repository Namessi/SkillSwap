// Importation du modèle Visibilite qui gère la visibilité publique ou privée des profils utilisateurs
const Visibilite = require('../models/visibilite.model');

// Contrôleur pour récupérer l'état de visibilité du profil de l'utilisateur connecté
exports.recupererEtat = (req, res) => {
    // Appel du modèle pour obtenir la visibilité de l'utilisateur
    Visibilite.getVisibilite(req.user.id, (err, result) => {
        // En cas d'erreur, retourne une réponse avec code 500
        if (err) return res.status(500).json({ message: "Erreur récupération", err });
        // Envoie de l'état de visibilité sous forme booléenne
        res.status(200).json({ profil_public: result[0].profil_public });
    });
};

// Contrôleur pour modifier l'état de visibilité du profil de l'utilisateur
exports.modifierEtat = (req, res) => {
    // Récupération de la nouvelle valeur de visibilité depuis le corps de la requête
    const { profil_public } = req.body;

    // Vérifie que la valeur reçue est bien un booléen
    if (typeof profil_public !== 'boolean') {
        return res.status(400).json({ message: "Valeur booléenne requise (true / false)" });
    }

    // Appel du modèle pour mettre à jour la visibilité de l'utilisateur
    Visibilite.setVisibilite(req.user.id, profil_public, (err) => {
        // En cas d'erreur, retourne une réponse avec code 500
        if (err) return res.status(500).json({ message: "Erreur mise à jour", err });
        // Sinon, retourne un message de confirmation avec l'état actuel
        res.status(200).json({ message: `Profil mis à jour. Visibilité : ${profil_public ? "publique" : "privée"}` });
    });
};
