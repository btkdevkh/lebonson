const asyncHandler = require('express-async-handler')
const ProductModel = require("../models/ProductModel")
const fs = require('fs')

// @desc Create product
// @route POST /api/v1/product/create
// @access PRIVATE
const createProduct = asyncHandler(async (req, res) => {
  const { title } = req.body

  if(!title) {
    res.status(400)
    throw new Error('Champs requise')
  }

  const productCreated = await ProductModel.createProduct(req);

  if(!productCreated) {
    res.status(401)
    throw new Error('Server error')
  }

  console.log('product created');
  res.status(201).json({ 'msg': 'Product created' })
})

// @desc Get all product
// @route GET /api/v1/product/all
// @access PUBLIC
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.getAllProducts();

  if(!products.rows) {
    res.status(500)
    throw new Error('Erreur du serveur')
  }

  res.status(200).json({ status: 200, products: products.rows });
})

// @desc Get one product
// @route GET /api/v1/product/:id
// @access PUBLIC
const getOneProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.getOneProduct(id);

  if(!product.rows[0]) {
    res.status(400)
    throw new Error('No product matched')
  }

  res.status(200).json({ status: 200, product: product.rows[0] });
})

// @desc Get products by order id
// @route GET /api/v1/product/order/:id
// @access PRIVATE
const getProductByOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const productsByOrderId = await ProductModel.getProductsByOrderId(id);

  if(!productsByOrderId.rows.length) {
    res.status(400)
    throw new Error('No products by order found')
  }

  res.status(200).json({ status: 200, productsByOrderId: productsByOrderId.rows });
})

// @desc update one product
// @route PUT /api/v1/product/update/:id
// @access PRIVATE
const updateOneProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { title, image } = req.body;

  if(!title) {
    res.status(400)
    throw new Error('Champs requise')
  }

  const productImg = await ProductModel.getOneProduct(id);

  if(image !== productImg.rows[0].image) {
    if(productImg[0].image !== 'no-picture.jpg') {
      fs.unlink(`backend/public/images/${productImg.rows[0].image}`, (err) => {
        if (err) throw err;
        console.log('Image product was updated');
      })
    }
  }
  
  const productUpdated = await ProductModel.updateOneProduct(req, id);

  if(!productUpdated.rows[0]) {
    res.status(500)
    throw new Error('Server error')
  }

  const product = await ProductModel.getOneProduct(id);
  res.status(200).json({ status: 200, message: "Product updated", product: product.rows[0] });
})

// @desc Delete one product
// @route DELETE /api/v1/product/delete/:id
// @access PRIVATE
const deleteOneProduct = asyncHandler(async (req, res) => {
  const id = req.params.id

  const productImg = await ProductModel.getOneProduct(id);

  if(productImg.rows[0].image !== 'no-picture.jpg') {
    let path = `backend/public/images/${productImg.rows[0].image}`

    if(fs.existsSync(path)) {
      fs.unlink(path, (err) => {
        // if(err) throw err;
        console.log('Image product was deleted');
      })
    }
  }
  
  const productDeleted = await ProductModel.deleteOneProduct(id);

  if(!productDeleted) {
    res.status(500)
    throw new Error('Server error')
  }

  res.status(200).json({ status: 200, message: "Product deleted" });
})

// @desc Save product image
// @route POST /api/v1/product/image
// @access PRIVATE
const saveProductImage = asyncHandler(async(req, res) => {
  // console.log("FILES", req.files);

  if(!req.files || Object.keys(req.files).length === 0) {
    res.status(400)
    throw new Error('La photo n\'a pas pu être récupérée')
  } 

  let imgName = req.body.image_name

  req.files.image.mv(`backend/public/images/${imgName}`, (err) => {
    if(err) {
      res.status(500);
      throw new Error('La photo n\'a pas pu être enregistrée')
    }

    res.status(200).json({ status: 200, url: imgName });
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
