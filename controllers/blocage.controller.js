const Blocage = require('../models/blocage.model');

exports.bloquer = (req, res) => {
    const bloqueur_id = req.user.id;
    const { bloque_id } = req.body;

    Blocage.bloquerUtilisateur(bloqueur_id, bloque_id, (err) => {
        if (err) return res.status(500).json({ message: "Erreur lors du blocage", err });
        res.status(200).json({ message: "Utilisateur bloqué." });
    });
};

exports.debloquer = (req, res) => {
    const bloqueur_id = req.user.id;
    const { bloque_id } = req.body;

    Blocage.debloquerUtilisateur(bloqueur_id, bloque_id, (err) => {
        if (err) return res.status(500).json({ message: "Erreur lors du déblocage", err });
        res.status(200).json({ message: "Utilisateur débloqué." });
    });
};

exports.listeBlocages = (req, res) => {
    Blocage.getBlocagesUtilisateur(req.user.id, (err, data) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la récupération", err });
        res.status(200).json(data);
    });
};
