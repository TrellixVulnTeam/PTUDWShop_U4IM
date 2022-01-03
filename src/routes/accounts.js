const express = require('express');
const router = express.Router();

const accountsController = require('../app/controllers/AccountsController');

router.get('/login', accountsController.login);
router.post('/login', accountsController.check);
module.exports = router;