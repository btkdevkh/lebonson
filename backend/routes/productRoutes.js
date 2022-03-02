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
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllProducts)
router.get("/:id", getOneProduct)
router.post('/image', saveProductImage)
router.get("/order/:id", getProductByOrder)
router.post("/create", protect, createProduct)
router.put("/update/:id", protect, updateOneProduct)
router.delete("/delete/:id", protect, deleteOneProduct)

module.exports = router
