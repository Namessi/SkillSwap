const express = require('express');
const router = express.Router();
const visibiliteController = require('../controllers/visibilite.controller');
const auth = require('../middleware/authmiddleware');

router.get('/', auth.verifyToken, visibiliteController.recupererEtat);
router.post('/modifier', auth.verifyToken, visibiliteController.modifierEtat);

module.exports = router;
