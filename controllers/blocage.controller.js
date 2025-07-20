// Importation du modèle Blocage qui contient les fonctions liées au blocage d'utilisateurs
const Blocage = require('../models/blocage.model');

// Contrôleur pour bloquer un utilisateur
exports.bloquer = (req, res) => {
    // Récupération de l'identifiant de l'utilisateur qui effectue le blocage depuis le token (req.user.id)
    const bloqueur_id = req.user.id;
    // Récupération de l'identifiant de l'utilisateur à bloquer depuis le corps de la requête
    const { bloque_id } = req.body;

    // Appel de la méthode du modèle pour bloquer l'utilisateur
    Blocage.bloquerUtilisateur(bloqueur_id, bloque_id, (err) => {
        // En cas d'erreur, on retourne un message d'erreur avec le code 500
        if (err) return res.status(500).json({ message: "Erreur lors du blocage", err });
        // Sinon, on retourne un message de confirmation
        res.status(200).json({ message: "Utilisateur bloqué." });
    });
};

// Contrôleur pour débloquer un utilisateur
exports.debloquer = (req, res) => {
    // Récupération de l'identifiant de l'utilisateur qui effectue le déblocage
    const bloqueur_id = req.user.id;
    // Récupération de l'identifiant de l'utilisateur à débloquer
    const { bloque_id } = req.body;

    // Appel de la méthode du modèle pour débloquer l'utilisateur
    Blocage.debloquerUtilisateur(bloqueur_id, bloque_id, (err) => {
        // En cas d'erreur, on retourne une réponse avec le message d'erreur
        if (err) return res.status(500).json({ message: "Erreur lors du déblocage", err });
        // Sinon, on retourne un message de succès
        res.status(200).json({ message: "Utilisateur débloqué." });
    });
};

// Contrôleur pour obtenir la liste des utilisateurs bloqués par l'utilisateur connecté
exports.listeBlocages = (req, res) => {
    // Appel de la méthode du modèle pour récupérer la liste des blocages de l'utilisateur
    Blocage.getBlocagesUtilisateur(req.user.id, (err, data) => {
        // En cas d'erreur, on retourne un message d'erreur
        if (err) return res.status(500).json({ message: "Erreur lors de la récupération", err });
        // Sinon, on retourne les données (liste des utilisateurs bloqués)
        res.status(200).json(data);
    });
};
