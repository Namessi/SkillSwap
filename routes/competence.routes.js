const express = require('express');
const router = express.Router();
const competenceController = require('../controllers/competence.controller');
const auth = require('../middleware/authmiddleware'); 

// 📚 Récupérer toutes les compétences de l’utilisateur connecté
router.get('/', auth.verifyToken, competenceController.getAllCompetences);

// 🔍 Récupérer une compétence spécifique par ID
router.get('/:id', auth.verifyToken, competenceController.getCompetenceById);

// ➕ Ajouter une nouvelle compétence
router.post('/', auth.verifyToken, competenceController.createCompetence);

// ✏️ Modifier une compétence existante
router.put('/:id', auth.verifyToken, competenceController.updateCompetence);

// 🗑️ Supprimer une compétence
router.delete('/:id', auth.verifyToken, competenceController.deleteCompetence);

module.exports = router;
