// Importation du modèle Public qui contient les méthodes accessibles sans authentification
const Public = require('../models/public.model');

// Contrôleur pour récupérer la liste publique des compétences disponibles
exports.competences = (req, res) => {
    // Appel du modèle pour obtenir les compétences
    Public.getCompetences((err, data) => {
        // En cas d'erreur, réponse avec message d'erreur
        if (err) return res.status(500).json({ message: "Erreur chargement compétences", err });
        // Sinon, envoie de la liste des compétences
        res.status(200).json(data);
    });
};

// Contrôleur pour récupérer la liste publique des tutoriels disponibles
exports.tutoriels = (req, res) => {
    // Appel du modèle pour obtenir les tutoriels publics
    Public.getTutosPublics((err, data) => {
        // En cas d'erreur, réponse avec message d'erreur
        if (err) return res.status(500).json({ message: "Erreur chargement tutoriels", err });
        // Sinon, envoie de la liste des tutoriels
        res.status(200).json(data);
    });
};

// Contrôleur pour récupérer les statistiques générales de l'application
exports.stats = (req, res) => {
    // Appel du modèle pour obtenir les statistiques globales
    Public.getStats((err, data) => {
        // En cas d'erreur, réponse avec message d'erreur
        if (err) return res.status(500).json({ message: "Erreur chargement stats", err });
        // Envoie de la première ligne de résultats (statistiques uniques)
        res.status(200).json(data[0]);
    });
};

// Contrôleur pour récupérer les profils visibles publiquement
exports.profils = (req, res) => {
    // Appel du modèle pour obtenir les profils publics
    Public.getProfilsPublics((err, data) => {
        // En cas d'erreur, réponse avec message d'erreur
        if (err) return res.status(500).json({ message: "Erreur chargement profils", err });
        // Sinon, envoie de la liste des profils
        res.status(200).json(data);
    });
};
