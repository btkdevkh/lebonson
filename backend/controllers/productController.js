const asyncHandler = require('express-async-handler')
const ProductModel = require("../models/ProductModel")

// @desc Create product
// @route POST /api/v1/product/create
// @access PRIVATE
const createProduct = asyncHandler(async (req, res) => {
  const { title } = req.body

  if(!title) {
    res.status(400)
    throw new Error('Champs requise')
  }

  const product = await ProductModel.createProduct(req);
  res.status(201).json(product)
})

// @desc Get all product
// @route GET /api/v1/product/all
// @access PUBLIC
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.getAllProducts();

  if(!products) {
    res.status(500)
    throw new Error('Erreur du serveur')
  }

  res.status(200).json({ status: 200, products });
})

// @desc Get one product
// @route GET /api/v1/product/:id
// @access PUBLIC
const getOneProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.getOneProduct(id);

  if(!product[0]) {
    res.status(400)
    throw new Error('No product matched')
  }

  res.status(200).json({ status: 200, product: product[0] });
})

// @desc Get products by order id
// @route GET /api/v1/product/order/:id
// @access PRIVATE
const getProductByOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const productsByOrderId = await ProductModel.getProductsByOrderId(id);

  if(!productsByOrderId.length) {
    res.status(400)
    throw new Error('No products by order found')
  }

  res.status(200).json({ status: 200, productsByOrderId: productsByOrderId });
})

// @desc update one product
// @route PUT /api/v1/product/update/:id
// @access PRIVATE
const updateOneProduct = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if(!title) {
    res.status(400)
    throw new Error('Champs requise')
  }

  const { id } = req.params
  const product = await ProductModel.updateOneProduct(req, id);

  if(!product) {
    res.status(500)
    throw new Error('Server error')
  }

  res.status(200).json({ status: 200, message: "Product updated" });
})

// @desc Delete one product
// @route DELETE /api/v1/product/delete/:id
// @access PRIVATE
const deleteOneProduct = asyncHandler(async (req, res) => {
  const id = req.params.id
  const product = await ProductModel.deleteOneProduct(id);

  if(!product) {
    res.status(500)
    throw new Error('Server error')
  }

  res.status(200).json({ status: 200, message: "Product deleted" });
})

// @desc Save product image
// @route POST /api/v1/product/image
// @access PRIVATE
const saveProductImage = asyncHandler( async(req, res, next) => {
  // console.log("FILES", req.files);

  if(!req.files || Object.keys(req.files).length === 0) {
    res.status(400)
    throw new Error('La photo n\'a pas pu être récupérée')
  } 

  req.files.image.mv('public/images/' + req.files.image.name, (err) => {
    if(err) {
      res.status(500);
      throw new Error('La photo n\'a pas pu être enregistrée')
    }

    res.status(200).json({ status: 200, url: req.files.image.name });
  })
})

module.exports = {
  createProduct,
  getAllProducts,
  getOneProduct,
  getProductByOrder,
  updateOneProduct,
  deleteOneProduct,
  saveProductImage
}
