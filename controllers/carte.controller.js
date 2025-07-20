// Importation du modèle Carte qui contient la logique de récupération des profils via la géolocalisation
const Carte = require('../models/carte.model');

// Contrôleur pour obtenir les profils d'utilisateurs situés à proximité sur la carte
exports.profilsSurCarte = (req, res) => {
    // Récupération des paramètres de localisation depuis la requête (latitude, longitude, rayon)
    const { latitude, longitude, rayon } = req.query;

    // Vérifie que la latitude et la longitude sont bien présentes dans la requête
    if (!latitude || !longitude) {
        return res.status(400).json({ message: "Latitude et longitude requises." });
    }

    // Appel de la méthode du modèle pour récupérer les utilisateurs à proximité
    // Si aucun rayon n'est fourni, un rayon par défaut de 50 est utilisé
    Carte.obtenirUtilisateursCarte(latitude, longitude, rayon || 50, (err, results) => {
        // En cas d'erreur, retour d'une erreur serveur
        if (err) return res.status(500).json({ message: "Erreur serveur", erreur: err });
        // En cas de succès, retour des résultats (liste des utilisateurs proches)
        res.status(200).json(results);
    });
};
