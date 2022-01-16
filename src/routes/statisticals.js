const express = require('express');
const router = express.Router();

const statisticalsController = require('../app/controllers/StatisticalsController');
router.get('/turnover', statisticalsController.turnover);
router.get('/product', statisticalsController.product);
module.exports = router;