const express = require('express');
const router = express.Router();

const customersController = require('../app/controllers/CustomersController');


router.get('/show', customersController.show);
router.get('/:id/detail', customersController.detail);
router.get('/:id/status', customersController.status);
module.exports = router;