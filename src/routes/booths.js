const express = require('express');
const router = express.Router();

const boothController = require('../app/controllers/BoothsController');

router.get('/', boothController.show);
router.get('/:id/edit', boothController.edit);
router.get('/:id/update', boothController.save);
module.exports = router;