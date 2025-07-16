const express = require('express');
const router = express.Router();
const blocageController = require('../controllers/blocage.controller');
const auth = require('../middleware/authmiddleware'); 

router.post('/bloquer', auth.verifyToken, blocageController.bloquer);
router.post('/debloquer', auth.verifyToken, blocageController.debloquer);
router.get('/list', auth.verifyToken, blocageController.listeBlocages);

module.exports = router;
