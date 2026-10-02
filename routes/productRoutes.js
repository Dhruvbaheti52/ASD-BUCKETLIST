const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { cacheMiddleware } = require('../middleware/cacheMiddleware');

router.route('/products')
    .get(cacheMiddleware, controller.getProducts)
    .post(controller.createProduct);

router.route('/products/:id')
    .get(cacheMiddleware, controller.getProductById)
    .put(controller.updateProduct)
    .patch(controller.patchProduct)
    .delete(controller.deleteProduct);

module.exports = router;
