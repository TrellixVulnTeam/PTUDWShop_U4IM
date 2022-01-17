const express = require('express');
const router = express.Router();

const ordersController = require('../app/controllers/OrdersController');
router.get('/show', ordersController.show);
router.get('/:id/update', ordersController.update);
module.exports = router;