// Importation du modèle Localisation qui gère les données de localisation des utilisateurs
const Localisation = require('../models/localisation.model');

// Contrôleur pour mettre à jour la localisation de l'utilisateur
exports.mettreAJourLocalisation = (req, res) => {
    // Préparation des données à enregistrer
    const data = {
        utilisateur_id: req.user.id, // ID de l'utilisateur connecté
        latitude: req.body.latitude, // Latitude reçue dans le corps de la requête
        longitude: req.body.longitude, // Longitude reçue dans le corps de la requête
        rayon_recherche: req.body.rayon_recherche || 50, // Rayon de recherche avec une valeur par défaut de 50
        ville: req.body.ville || null // Ville optionnelle
    };
    
    // Importation du modèle Crossing pour détecter les croisements à partir de la localisation
    const Crossing = require('../models/crossing.model');
    
    // Détection des croisements avec un seuil de 100 mètres
    Crossing.detecterCroisements(data.utilisateur_id, data.latitude, data.longitude, 100, (err, resultats) => {
        // Si des croisements sont détectés et qu'il n'y a pas d'erreur
        if (!err && resultats.length) {
            // Enregistrement de chaque croisement détecté
            resultats.forEach(croisement => {
                Crossing.enregistrerCroisement(data.utilisateur_id, croisement.utilisateur_id, croisement.distance_m, () => {});
            });
        }
    });

    // Enregistrement ou mise à jour de la localisation en base de données
    Localisation.ajouterLocalisation(data, (err, result) => {
        // En cas d'erreur, réponse avec code 500
        if (err) return res.status(500).json({ message: "Erreur serveur", erreur: err });
        // Si tout va bien, confirmation de la mise à jour
        res.status(200).json({ message: "Localisation mise à jour." });
    });
};

// Contrôleur pour récupérer la localisation actuelle de l'utilisateur connecté
exports.recupererLocalisation = (req, res) => {
    // Récupération de la localisation par ID utilisateur
    Localisation.getLocalisationParUtilisateur(req.user.id, (err, result) => {
        // En cas d'erreur, réponse avec code 500
        if (err) return res.status(500).json({ message: "Erreur", erreur: err });
        // Si OK, envoie de la première ligne (résultat unique attendu)
        res.status(200).json(result[0]);
    });
};

// Contrôleur pour obtenir la liste des utilisateurs proches en fonction des coordonnées fournies
exports.utilisateursProches = (req, res) => {
    // Récupération des paramètres de recherche (latitude, longitude, rayon) depuis la requête
    const { latitude, longitude, rayon } = req.query;

    // Appel du modèle pour obtenir les utilisateurs dans le rayon donné (par défaut 50)
    Localisation.getUtilisateursProches(latitude, longitude, rayon || 50, (err, results) => {
        // En cas d'erreur, réponse avec code 500
        if (err) return res.status(500).json({ message: "Erreur serveur", erreur: err });
        // Sinon, retour de la liste des utilisateurs proches
        res.status(200).json(results);
    });
};
