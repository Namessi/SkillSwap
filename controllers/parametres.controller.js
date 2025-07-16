// controllers/parametres.controller.js

const Parametres = require('../models/parametres.model');

/**
 * ⚙️ Récupérer les paramètres de l'utilisateur connecté
 * Si aucun paramètre n'existe, en créer par défaut
 */
exports.getParametres = (req, res) => {
  const userId = req.user.id;

  Parametres.getByUserId(userId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });

    if (results.length === 0) {
      // Aucun paramètre trouvé → on crée les paramètres par défaut
      Parametres.createDefault(userId, (err2) => {
        if (err2) return res.status(500).json({ message: 'Erreur création paramètres par défaut' });

        // On les récupère après création
        Parametres.getByUserId(userId, (err3, res3) => {
          if (err3) return res.status(500).json({ message: 'Erreur serveur' });
          res.status(200).json(res3[0]);
        });
      });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

/**
 * 🛠️ Mettre à jour les paramètres utilisateur
 * @body langue, notifications_activees, theme
 */
exports.updateParametres = (req, res) => {
  const userId = req.user.id;
  const { langue, notifications_activees, theme } = req.body;

  // Validation simple (à améliorer)
  if (!langue || typeof notifications_activees === 'undefined' || !theme) {
    return res.status(400).json({ message: 'Champs manquants ou invalides' });
  }

  Parametres.update(userId, { langue, notifications_activees, theme }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });

    res.status(200).json({ message: 'Paramètres mis à jour avec succès' });
  });
};
