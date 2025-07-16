// routes/auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// ✅ Connexion (publique)
router.post('/login', authController.login);

// ✅ Inscription (publique — à sécuriser si besoin plus tard)
router.post('/register', authController.register);

module.exports = router;
