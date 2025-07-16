const Match = require('../models/match.model');
const db = require('../database/dbConnection');

exports.envoyerLike = (req, res) => {
    const { cible_id, type_like } = req.body;
    const utilisateur_id = req.user.id;

    const envoyerEtVerifier = () => {
        Match.envoyerLike({ utilisateur_1: utilisateur_id, utilisateur_2: cible_id, type_like }, (err) => {
            if (err) return res.status(500).json({ message: "Erreur lors du like" });

            Match.verifierMatch(utilisateur_id, cible_id, (err, rows) => {
                if (err) return res.status(500).json({ message: "Erreur vérification match" });

                if (rows.length > 0) {
                    Match.confirmerMatch(utilisateur_id, cible_id, (err) => {
                        if (err) return res.status(500).json({ message: "Erreur confirmation match" });
                        return res.status(200).json({ matched: true, message: "Match trouvé !" });
                    });
                } else {
                    res.status(200).json({ matched: false, message: "Like envoyé." });
                }
            });
        });
    };

    if (type_like === 'superlike') {
        db.query('UPDATE utilisateurs SET superlikes = superlikes - 1 WHERE id = ? AND superlikes > 0', [utilisateur_id], (err, result) => {
            if (err || result.affectedRows === 0) {
                return res.status(403).json({ message: "Pas assez de superlikes" });
            }
            envoyerEtVerifier();
        });
    } else {
        envoyerEtVerifier();
    }
};

exports.obtenirSuggestions = (req, res) => {
    const { latitude, longitude, rayon } = req.query;
    Match.suggestions(req.user.id, latitude, longitude, rayon || 50, (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur lors des suggestions", erreur: err });
        res.status(200).json(results);
    });
};

exports.historiqueMatchs = (req, res) => {
    Match.getHistoriqueMatchs(req.user.id, (err, data) => {
        if (err) return res.status(500).json({ message: "Erreur historique", err });
        res.status(200).json(data);
    });
};
