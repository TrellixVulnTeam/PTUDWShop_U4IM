const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');

router.get('/add', productsController.add);
router.post('/store', productsController.store);
router.get('/show', productsController.show);
router.get('/search', productsController.search);
router.get('/:id/update', productsController.update);
router.put('/save-update/:id', productsController.save);
router.delete('/:id', productsController.delete);
module.exports = router;