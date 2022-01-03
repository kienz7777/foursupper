const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');

router.post('/login', controller.loginController);
router.get('/getAll', controller.getAll);
router.put('/reset-payment', controller.resetPayment);

module.exports = router;