// Importation du modèle Crossing qui gère la logique de détection et d'enregistrement des croisements d'utilisateurs
const Crossing = require('../models/crossing.model');

// Contrôleur pour détecter et enregistrer les croisements d'utilisateurs à partir de leur position actuelle
exports.enregistrerCroisements = (req, res) => {
    // Récupération de l'identifiant de l'utilisateur connecté via le token
    const id = req.user.id;
    // Récupération des coordonnées de l'utilisateur depuis le corps de la requête
    const { latitude, longitude } = req.body;
    // Définition du seuil de détection des croisements en mètres (ici 100m)
    const seuil_m = 100;

    // Appel de la méthode pour détecter les croisements avec d'autres utilisateurs
    Crossing.detecterCroisements(id, latitude, longitude, seuil_m, (err, resultats) => {
        // En cas d'erreur, on retourne une erreur 500
        if (err) return res.status(500).json({ message: "Erreur détection", err });

        // Pour chaque croisement détecté, on enregistre l'événement en base
        resultats.forEach(croisement => {
            Crossing.enregistrerCroisement(id, croisement.utilisateur_id, croisement.distance_m, () => {});
        });

        // On retourne un message de confirmation avec le nombre de croisements détectés
        res.status(200).json({ message: "Croisements analysés", croisés: resultats.length });
    });
};

// Contrôleur pour récupérer la liste des profils croisés avec l'utilisateur connecté
exports.recupererCroisements = (req, res) => {
    // Appel de la méthode pour récupérer les croisements de l'utilisateur
    Crossing.getProfilsCroisés(req.user.id, (err, data) => {
        // En cas d'erreur, on retourne un message d'erreur
        if (err) return res.status(500).json({ message: "Erreur récupération", err });
        // En cas de succès, on retourne les données (profils croisés)
        res.status(200).json(data);
    });
};
