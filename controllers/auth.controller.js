/**
 * controllers/auth.controller.js
 *
 * Contrôleur des opérations d’authentification :
 *  - login
 *  - register
 *  - logout (optionnel)
 */

const Auth = require('../models/auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @route   POST /api/auth/login
 * @desc    Connexion utilisateur
 */
exports.login = (req, res) => {
  const { email, mot_de_passe } = req.body;

  Auth.findByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });

    if (result.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const utilisateur = result[0];

    bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });

      if (!isMatch) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }

      // Construction du payload pour le JWT
      const payload = {
        id: utilisateur.id,
        email: utilisateur.email,
        role: utilisateur.role || 'user'
      };

      // Génération du token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
      });

      res.status(200).json({
        message: 'Connexion réussie',
        token,
        utilisateur: {
          id: utilisateur.id,
          nom: utilisateur.nom,
          email: utilisateur.email,
          role: utilisateur.role || 'user'
        }
      });
    });
  });
};

/**
 * @route   POST /api/auth/register
 * @desc    Création d’un nouveau compte utilisateur
 */
exports.register = async (req, res) => {
  const { nom, email, mot_de_passe } = req.body;

  try {
    // Vérifie si l’utilisateur existe déjà
    Auth.findByEmail(email, async (err, result) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });

      if (result.length > 0) {
        return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
      }

      const hash = await bcrypt.hash(mot_de_passe, 10);
      const newUser = { nom, email, mot_de_passe: hash };

      Auth.createUser(newUser, (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de l'inscription" });

        res.status(201).json({
          message: 'Utilisateur inscrit avec succès',
          userId: result.insertId
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * @route   POST /api/auth/logout
 * @desc    Déconnexion utilisateur (optionnel)
 * @access  Privé
 */
exports.logout = (req, res) => {
  // Dans le cas d'une blacklist de refreshTokens, tu pourrais l'ajouter ici
  res.status(200).json({ message: 'Déconnexion réussie (token à oublier côté client)' });
};
