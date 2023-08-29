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
module.exports = router;
