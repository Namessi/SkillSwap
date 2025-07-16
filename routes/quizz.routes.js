const express = require('express');
const router = express.Router();
const quizzController = require('../controllers/quizz.controller');
const auth = require('../middleware/authmiddleware'); 

/** 🔓 Routes publiques */
router.get('/', quizzController.getAllQuizz);                        // Liste des quiz publics
router.get('/:id', quizzController.getQuizzById);                   // Détail d’un quiz
router.post('/:id/submit', quizzController.answerQuizz);            // Réponse anonyme (optionnel)

/** 🔐 Routes protégées : utilisateur connecté */
router.post('/repondre', auth.verifyToken, quizzController.repondreQuiz);
router.get('/superlikes', auth.verifyToken, quizzController.mesSuperlikes);

/** 🔐 Routes admin : création/modif/suppression de quizz */
router.post('/', auth.verifyToken, auth.isAdmin, quizzController.createQuizz);
router.put('/:id', auth.verifyToken, auth.isAdmin, quizzController.updateQuizz);
router.delete('/:id', auth.verifyToken, auth.isAdmin, quizzController.deleteQuizz);

module.exports = router;
