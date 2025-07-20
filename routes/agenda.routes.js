// routes/agenda.routes.js

const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agenda.controller');
const { verifyToken } = require('../middleware/authmiddleware');

/**
 * @route   POST /api/agenda
 * @desc    Créer un événement dans l’agenda de l’utilisateur connecté
 */
router.post('/', verifyToken, agendaController.creerEvenement);

/**
 * @route   GET /api/agenda
 * @desc    Récupérer tous les événements de l’utilisateur connecté
 */
router.get('/', verifyToken, agendaController.getEvenementsUtilisateur);

/**
 * @route   DELETE /api/agenda/:id
 * @desc    Supprimer un événement spécifique de l’utilisateur connecté
 */
router.delete('/:id', verifyToken, agendaController.supprimerEvenement);

module.exports = router;
