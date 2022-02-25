const { 
  createOrder, 
  createOrderPayment, 
  validateOrder, 
  getAllOrders, 
  getOrderDetailsByUser, 
  getOneOrder, 
  updateOneOrder, 
  deleteOneOrder, 
  getOrderDetailsByOrderCart 
} = require('../controllers/orderController');
const withAuth = require("../middleware/withAuth");
const express = require('express')

const router = express.Router();

router.post("/", withAuth, createOrder)
router.post("/payment", withAuth, createOrderPayment)
router.put("/validate", withAuth, validateOrder)
router.get("/all", withAuth, getAllOrders)
router.get("/user/:id", withAuth, getOrderDetailsByUser)
router.get("/:id", withAuth, getOneOrder)
router.put("/update/:id", withAuth, updateOneOrder)
router.delete("/delete/:id", withAuth, deleteOneOrder)
router.get("/detail/:id", withAuth, getOrderDetailsByOrderCart)

module.exports = router;
