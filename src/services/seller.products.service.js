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

module.exports = { addProductDB };
