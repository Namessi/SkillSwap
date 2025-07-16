const express = require('express');
const router = express.Router();
const publicController = require('../controllers/public.controller');

router.get('/competences', publicController.competences);
router.get('/tutoriels', publicController.tutoriels);
router.get('/stats', publicController.stats);
router.get('/profils', publicController.profils);

module.exports = router;
