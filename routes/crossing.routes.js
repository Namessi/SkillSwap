const express = require('express');
const router = express.Router();
const crossingController = require('../controllers/crossing.controller');
const auth = require('../middleware/authmiddleware');

// ✅ On utilise bien auth.verifyToken pour chaque route protégée
router.post('/detecter', auth.verifyToken, crossingController.enregistrerCroisements);
router.get('/list', auth.verifyToken, crossingController.recupererCroisements);

module.exports = router;
