const { 
  getAllProducts, 
  getOneProduct, 
  updateOneProduct, 
  deleteOneProduct,
  getProductByOrder,
  saveProductImage,
  createProduct
} = require("../controllers/productController");
const express = require("express");
const withAuth = require("../middleware/withAuth");

const router = express.Router();

router.get("/", getAllProducts)
router.get("/:id", getOneProduct)
router.post('/image', saveProductImage)
router.get("/order/:id", getProductByOrder)
router.post("/create", withAuth, createProduct)
router.put("/update/:id", withAuth, updateOneProduct)
router.delete("/delete/:id", withAuth, deleteOneProduct)

module.exports = router
