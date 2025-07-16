const Public = require('../models/public.model');

exports.competences = (req, res) => {
    Public.getCompetences((err, data) => {
        if (err) return res.status(500).json({ message: "Erreur chargement compétences", err });
        res.status(200).json(data);
    });
};

exports.tutoriels = (req, res) => {
    Public.getTutosPublics((err, data) => {
        if (err) return res.status(500).json({ message: "Erreur chargement tutoriels", err });
        res.status(200).json(data);
    });
};

exports.stats = (req, res) => {
    Public.getStats((err, data) => {
        if (err) return res.status(500).json({ message: "Erreur chargement stats", err });
        res.status(200).json(data[0]);
    });
};

exports.profils = (req, res) => {
    Public.getProfilsPublics((err, data) => {
        if (err) return res.status(500).json({ message: "Erreur chargement profils", err });
        res.status(200).json(data);
    });
};
