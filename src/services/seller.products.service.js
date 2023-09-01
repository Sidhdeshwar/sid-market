const productsModal = require('../modules/products.modal');

const addProductDB = async (req, imgArray) => {
  const prodObj = {
    ...req.body,
    images: imgArray,
    _org: req.COMPANY_DATA,
    _seller: req.USER_DATA,
  };

  const addProd = await productsModal.create(prodObj);
  return addProd;
};

const getOneProductDB = async (req) => {
  const getProd = await productsModal.findById(req.params.id);
  return getProd;
};

const updateProductDB = async (req) => {
  const updateProd = await productsModal.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  return updateProd;
};

const updateProductImagesDB = async (req, imagesArray) => {
  //   const imgObj = { images: imagesArray };
  //   const updateProd = await productsModal.findByIdAndUpdate(req.params.id, imgObj);
  //   return updateProd;
  //! Need to Update Images
};

const deleteProductDB = async (req) => {
  const deleteProd = await productsModal.findByIdAndDelete(req.params.id);
  return deleteProd;
};

const getAllProductsDB = async (req) => {
  const getAllProd = await productsModal.aggregate([
    {
      $match: { price: { $gte: 15000 } },
    },
    {
      $group: { _id },
    },
  ]);
  return getAllProd;
};

module.exports = {
  addProductDB,
  getOneProductDB,
  updateProductDB,
  updateProductImagesDB,
  deleteProductDB,
  getAllProductsDB,
};
