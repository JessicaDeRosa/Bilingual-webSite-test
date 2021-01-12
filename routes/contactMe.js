const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexControllers');
router.get('/contactMe',indexController.contactMe);
module.exports = router;