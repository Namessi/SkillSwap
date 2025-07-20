// Importation d'Express et création d’un routeur
const express = require('express');
const router = express.Router();

// Importation du contrôleur qui gère les opérations de blocage
const blocageController = require('../controllers/blocage.controller');

// Importation du middleware d'authentification pour protéger les routes
const auth = require('../middleware/authmiddleware'); 

// Route POST pour bloquer un utilisateur (authentification requise)
router.post('/bloquer', auth.verifyToken, blocageController.bloquer);

// Route POST pour débloquer un utilisateur (authentification requise)
router.post('/debloquer', auth.verifyToken, blocageController.debloquer);

// Route GET pour récupérer la liste des utilisateurs bloqués (authentification requise)
router.get('/list', auth.verifyToken, blocageController.listeBlocages);

// Exportation du routeur pour l'utiliser dans l'application principale
module.exports = router;
