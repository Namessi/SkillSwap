// Importation du modèle Match pour gérer les interactions de type "like", "match", etc.
const Match = require('../models/match.model');
// Importation de la connexion à la base de données pour exécuter des requêtes directes
const db = require('../database/dbConnection');

// Contrôleur pour envoyer un like ou superlike à un autre utilisateur
exports.envoyerLike = (req, res) => {
    // Récupération de l'ID de l'utilisateur ciblé et du type de like (like ou superlike)
    const { cible_id, type_like } = req.body;
    // ID de l'utilisateur connecté
    const utilisateur_id = req.user.id;

    // Fonction interne pour envoyer le like et vérifier s'il y a un match réciproque
    const envoyerEtVerifier = () => {
        // Envoie du like via le modèle
        Match.envoyerLike({ utilisateur_1: utilisateur_id, utilisateur_2: cible_id, type_like }, (err) => {
            if (err) return res.status(500).json({ message: "Erreur lors du like" });

            // Vérifie si un match réciproque existe entre les deux utilisateurs
            Match.verifierMatch(utilisateur_id, cible_id, (err, rows) => {
                if (err) return res.status(500).json({ message: "Erreur vérification match" });

                // Si un match est détecté, confirmation du match en base de données
                if (rows.length > 0) {
                    Match.confirmerMatch(utilisateur_id, cible_id, (err) => {
                        if (err) return res.status(500).json({ message: "Erreur confirmation match" });
                        return res.status(200).json({ matched: true, message: "Match trouvé !" });
                    });
                } else {
                    // Sinon, simple envoi du like sans match
                    res.status(200).json({ matched: false, message: "Like envoyé." });
                }
            });
        });
    };

    // Si le type de like est un superlike, on vérifie d'abord que l'utilisateur a des superlikes disponibles
    if (type_like === 'superlike') {
        db.query('UPDATE utilisateurs SET superlikes = superlikes - 1 WHERE id = ? AND superlikes > 0', [utilisateur_id], (err, result) => {
            // Si erreur ou aucun superlike disponible, on bloque l'action
            if (err || result.affectedRows === 0) {
                return res.status(403).json({ message: "Pas assez de superlikes" });
            }
            // Sinon, on procède à l'envoi du superlike et à la vérification
            envoyerEtVerifier();
        });
    } else {
        // Si ce n'est pas un superlike, on envoie directement
        envoyerEtVerifier();
    }
};

// Contrôleur pour récupérer des suggestions de profils à proximité
exports.obtenirSuggestions = (req, res) => {
    // Récupération des paramètres de localisation (avec un rayon par défaut de 50)
    const { latitude, longitude, rayon } = req.query;
    // Appel de la méthode du modèle pour obtenir les suggestions
    Match.suggestions(req.user.id, latitude, longitude, rayon || 50, (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur lors des suggestions", erreur: err });
        res.status(200).json(results);
    });
};

// Contrôleur pour récupérer l'historique des matchs de l'utilisateur
exports.historiqueMatchs = (req, res) => {
    // Appel de la méthode pour récupérer les anciens matchs de l'utilisateur connecté
    Match.getHistoriqueMatchs(req.user.id, (err, data) => {
        if (err) return res.status(500).json({ message: "Erreur historique", err });
        res.status(200).json(data);
    });
};

// Contrôleur pour proposer un utilisateur au hasard (découverte aléatoire)
exports.decouverteAleatoire = (req, res) => {
    const utilisateur_id = req.user.id;

    // Requête SQL pour sélectionner un utilisateur aléatoire, différent de l'utilisateur actuel
    const sql = `
        SELECT id, nom, prenom, photo_profil, bio
        FROM utilisateurs
        WHERE id != ?
        ORDER BY RAND()
        LIMIT 1
    `;

    // Exécution de la requête SQL
    db.query(sql, [utilisateur_id], (err, result) => {
        // En cas d'erreur, réponse 500
        if (err) return res.status(500).json({ message: "Erreur découverte aléatoire", err });
        // Si aucun utilisateur trouvé, réponse 404
        if (result.length === 0) return res.status(404).json({ message: "Aucun utilisateur trouvé" });
        // Sinon, on retourne le profil sélectionné
        res.status(200).json(result[0]);
    });
};
