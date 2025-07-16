const express = require('express');
const router = express.Router();
const carteController = require('../controllers/carte.controller');
const { verifyToken } = require('../middleware/authmiddleware'); 

router.get('/profils', verifyToken, carteController.profilsSurCarte); 

module.exports = router;
