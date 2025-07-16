// controllers/admin.controller.js

const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @route   POST /api/admin/login
 * @desc    Connexion admin (génère un token JWT avec rôle)
 */
exports.loginAdmin = (req, res) => {
  const { email, mot_de_passe } = req.body;

  Admin.findByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    if (result.length === 0) {
      return res.status(404).json({ message: 'Admin non trouvé' });
    }

    const admin = result[0];

    bcrypt.compare(mot_de_passe, admin.mot_de_passe, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });

      if (!isMatch) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }

      const token = jwt.sign(
        { id: admin.id, email: admin.email, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
      );

      res.status(200).json({
        message: 'Connexion réussie',
        token,
        admin: {
          id: admin.id,
          nom: admin.nom,
          email: admin.email,
          role: 'admin'
        }
      });
    });
  });
};

/**
 * @route   POST /api/admin/register
 * @desc    Créer un nouvel admin (réservé aux admins)
 */
exports.createAdmin = async (req, res) => {
  const { nom, email, mot_de_passe } = req.body;

  try {
    const hash = await bcrypt.hash(mot_de_passe, 10);
    Admin.create({ nom, email, mot_de_passe: hash }, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erreur lors de la création de l\'admin' });
      }

      res.status(201).json({
        message: 'Admin créé avec succès',
        adminId: result.insertId
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * @route   GET /api/admin
 * @desc    Lister tous les administrateurs
 */
exports.getAllAdmins = (req, res) => {
  Admin.getAll((err, admins) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la récupération des admins' });
    res.status(200).json(admins);
  });
};

/**
 * @route   DELETE /api/admin/:id
 * @desc    Supprimer un administrateur (par ID)
 */
exports.deleteAdmin = (req, res) => {
  const id = req.params.id;

  Admin.delete(id, (err) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la suppression' });
    res.status(200).json({ message: 'Admin supprimé avec succès' });
  });
};

/**
 * @route   GET /api/admin/stats
 * @desc    Statistiques globales (tableau de bord)
 */
exports.statsDashboard = (req, res) => {
  Admin.getDashboardStats((err, data) => {
    if (err) return res.status(500).json({ message: 'Erreur stats', err });
    res.status(200).json(data[0]);
  });
};

/**
 * @route   GET /api/admin/signalements
 * @desc    Liste des signalements en attente
 */
exports.signalements = (req, res) => {
  Admin.getSignalementsEnAttente((err, data) => {
    if (err) return res.status(500).json({ message: 'Erreur signalements', err });
    res.status(200).json(data);
  });
};

/**
 * @route   GET /api/admin/alertes
 * @desc    Utilisateurs avec 3 signalements ou plus
 */
exports.utilisateursAlerte = (req, res) => {
  Admin.getUtilisateursAlerte((err, data) => {
    if (err) return res.status(500).json({ message: 'Erreur alertes', err });
    res.status(200).json(data);
  });
};
