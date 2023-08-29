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
  console.log('XXXXXXXXXX ; ', req.body);
  const imagesArray = req.files.map((obj) => obj.path) || [];
  const addProd = await serviceIndex.productsService.addProductDB(req, imagesArray);
  res.status(200).json({
    status: 'success',
    data: addProd,
  });
});

module.exports = { addProduct, imageMiddleware };
