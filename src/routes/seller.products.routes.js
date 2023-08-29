/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const authMiddleware = require('../middlewares/seller');
const productsIndex = require('../controller/index');

const router = express();
router.use(authMiddleware);

router
  .route('/')
  .post(
    productsIndex.productsController.imageMiddleware.array('prod'),
    productsIndex.productsController.addProduct,
  );
router.route('/:id').get(productsIndex.productsController.getOneProduct).patch(productsIndex.productsController.updateProduct).delete(productsIndex.productsController.deleteProduct);
router.route('/images/:id').patch(productsIndex.productsController.updateProductImages); //! Remaining

module.exports = router;
