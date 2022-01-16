const express = require('express');
const router = express.Router();

const statisticalsController = require('../app/controllers/StatisticalsController');
router.get('/product', statisticalsController.product);
router.get('/ordder', statisticalsController.order);
module.exports = router;