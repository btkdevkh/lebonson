const { 
  createOrder, 
  createOrderPayment, 
  validateOrder, 
  getAllOrders, 
  getOrderDetailsByUser, 
  getOneOrder, 
  updateOneOrder, 
  deleteOneOrder, 
  getOrderDetailsByOrderCart ,
  //createOrderPaymentOldVersion
} = require('../controllers/orderController');
const protect = require("../middleware/authMiddleware");
const express = require('express')

const router = express.Router();

router.post("/api/v1/order", protect, createOrder)
// router.post("/api/v1/order/payment", protect, createOrderPaymentOldVersion)
router.post("/create-checkout-session", protect, createOrderPayment)
router.put("/api/v1/order/validate", protect, validateOrder)
router.get("/api/v1/order/all", protect, getAllOrders)
router.get("/api/v1/order/user/:id", protect, getOrderDetailsByUser)
router.get("/api/v1/order/:id", protect, getOneOrder)
router.put("/api/v1/order/update/:id", protect, updateOneOrder)
router.delete("/api/v1/order/delete/:id", protect, deleteOneOrder)
router.get("/api/v1/order/detail/:id", protect, getOrderDetailsByOrderCart)

module.exports = router;
