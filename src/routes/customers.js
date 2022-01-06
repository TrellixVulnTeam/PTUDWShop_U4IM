const express = require('express');
const router = express.Router();

const customersController = require('../app/controllers/CustomersController');


router.get('/show', customersController.show);

module.exports = router;