const express = require('express');
const router = express.Router();
const dispoController = require('../controllers/disponibilite.controller');
const auth = require('../middleware/authmiddleware');

router.post('/set', auth.verifyToken, dispoController.enregistrerDisponibilites);
router.get('/me', auth.verifyToken, dispoController.recupererDisponibilites);

module.exports = router;
