const express = require('express');
const router = express.Router();

const controller = require('../controllers/order.controller');

router.get('/getAll', controller.getAllOrder);
router.post('/create', controller.createOrder);
router.put('/edit', controller.editOrder);
router.put('/delete', controller.deleteOrder);
router.put('/deleteAll', controller.deleteAllOrder);

module.exports = router;