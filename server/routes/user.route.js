const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');

router.post('/login',controller.loginController);

module.exports = router;