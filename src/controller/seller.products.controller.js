// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const serviceIndex = require('../services/index');
const catchAsync = require('../utilities/catch.Error');

// ******************* Middleware IMG ***************************
const imageMiddleware = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      //* Works ==>   cb(null, `${__dirname}/../images`);
      cb(null, 'images/product');
    },
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    },
  }),
});
// *************************************************************
const addProduct = catchAsync(async (req, res, next) => {
  const imagesArray = req.files.map((obj) => obj.path) || [];
  const addProd = await serviceIndex.productsService.addProductDB(
    req,
    imagesArray
  );
  res.status(200).json({
    status: 'success',
    data: addProd,
  });
});

const getOneProduct = catchAsync(async (req, res, next) => {
  const oneProd = await serviceIndex.productsService.getOneProductDB(req);
  res.status(200).json({
    status: 'success',
    data: oneProd,
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const updateProd = await serviceIndex.productsService.updateProductDB(req);
  res.status(200).json({
    status: 'success',
    data: updateProd,
  });
});

const updateProductImages = catchAsync(async (req, res, next) => {
  // console.log('YYYYYYYYYYYYYYY  ; ', req.body);
  // const imagesArray = req.files.map((obj) => obj.path) || [];
  // const addProd = await serviceIndex.productsService.updateProductImagesDB(
  //   req,
  //   imagesArray,
  // );
  // res.status(200).json({
  //   status: 'success',
  //   data: addProd,
  // });
  //! Remaining
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const deleteProd = await serviceIndex.productsService.deleteProductDB(req);
  res.status(200).json({
    status: 'success',
    data: deleteProd,
  });
});

const getAllProducts = catchAsync(async (req, res, next) => {
  const allProd = await serviceIndex.productsService.getAllProductsDB(req);
  res.status(200).json({
    status: 'success',
    data: allProd,
  });
});

module.exports = {
  addProduct,
  imageMiddleware,
  getOneProduct,
  updateProduct,
  updateProductImages,
  deleteProduct,
  getAllProducts,
};
