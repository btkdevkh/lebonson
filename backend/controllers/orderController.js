const OrderModel = require("../models/OrderModel");
const OrderDetailModel = require("../models/OrderDetailModel");
const ProductModel = require("../models/ProductModel");
const stripe = require('stripe')(process.env.SK_TEST);
const asyncHandler = require('express-async-handler')

// @desc Create order
// @route POST /api/v1/order/create
// @access PRIVATE
const createOrder = asyncHandler(async (req, res) => {
  // Inital total amount
  let totalAmount = 0;

  // First, create order cart
  const order = await OrderModel.createOrder(req.body.user_id, totalAmount);
  // console.log(order);

  if(!order) {
    res.status(500)
    throw new Error('Server error');
  }

  let order_id = order.insertId
  // console.log(order_id);

  // Get products from the client cart
  let products = req.body.products;
  // console.log(products);

  // Loop throught products
  await Promise.all(products.map(async(product, idx) => {
    // console.log(product);

    let productInfo = await ProductModel.getOneProduct(product.id);

    // Total price HT
    let total = parseInt(product.selectedQuantity) * parseFloat(productInfo[0].price);
    // Price TVA
    const taxPrice = Number((0.15 * total).toFixed(2));
    // Total TTC
    const totalPrice = total + taxPrice
    totalAmount += totalPrice;

    // Second, save each product in order detail
    await OrderDetailModel.createOrderDetail(order_id, product.id, product.selectedQuantity, total);
    // console.log("ORDER DETAIL", orderDetail);

    // Update total amount
    let updateTotalAmount = await OrderModel.updateTotalAmount(totalAmount, order_id);
    console.log(updateTotalAmount);
  }))

  res.status(200).json({ status: 200, message: "Order created", order: order, order_id: order_id });
})

// @desc Create order payment
// @route POST /api/v1/order/payment
// @access PRIVATE
const createOrderPayment = asyncHandler(async(req, res, next) => {
  console.log(req.body);

  let order = await OrderModel.getOneOrder(req.body.order_id);
  console.log("ORDER", order);

  if(!order[0]) {
    res.status(500)
    throw new Error('Server error');
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: order[0].totalAmount * 100,
    currency: 'eur',
    metadata: { integration_check: 'accept_a_payment' },
    receipt_email: req.body.email,
  });
  console.log(paymentIntent);

  if(!paymentIntent) {
    res.status(500)
    throw new Error('Server error');
  }

  res.status(200).json({ status: 200, client_secret: paymentIntent['client_secret'] });
})

// @desc Create validate order
// @route POST /api/v1/order/validate
// @access PRIVATE
const validateOrder = asyncHandler(async(req, res, next) => {
  let result = await OrderModel.updateStatus(req.body.order_id);

  if(!result) {
    res.status(500).json({ err: result });
    throw new Error('Server error');
  }

  let productsOrdered = await ProductModel.getProductsByOrderId(req.body.order_id)
  console.log("PRODUCT ORDERED", productsOrdered);

  if(!productsOrdered) {
    res.status(500);
    throw new Error('Server error');
  }

  productsOrdered.map(async(product, idx) => {
    let newQantity = parseInt(product.quantity) - parseInt(product.selectedQty);

    let result = await ProductModel.changeProductQuantity(newQantity, product.product_id);
    console.log(result);
  })

  const products = await ProductModel.getAllProducts();

  if(!products) {
    res.status(500).json({ err: products })
    throw new Error('Server error');
  }

  res.status(200).json({ status: 200, message: "status validé", products: products });
})

// @desc Get all order
// @route GET /api/v1/order/all
// @access PRIVATE
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await OrderModel.getAllOrders();

  if(!orders) {
    res.status(500);
    throw new Error('Server error');
  }

  res.status(200).json({ status: 200, message: "OK", orders: orders });
})

// @desc Get orders detail by user id
// @route GET /api/v1/order/user/:id
// @access PRIVATE
const getOrderDetailsByUser = asyncHandler(async (req, res) => {
  const id = req.params.id
  const ordersByUserId = await OrderModel.getAllOrdersByUserId(id);
  console.log(ordersByUserId);

  if(!ordersByUserId) {
    res.status(500);
    throw new Error('Server error');
  }

  res.status(200).json({ status: 200, message: "OK", ordersByUserId: ordersByUserId });
})

// @desc Get one order
// @route GET /api/v1/order/:id
// @access PRIVATE
const getOneOrder = asyncHandler(async (req, res) => {
  const id = req.params.id
  const order = await OrderModel.getOneOrder(id);

  if(!order[0]) {
    res.status(500);
    throw new Error('Server error');
  }

  res.status(200).json({ status: 200, message: "OK", order: order[0] });
})

// @desc update one order
// @route PUT /api/v1/order/update/:id
// @access PRIVATE
const updateOneOrder = asyncHandler(async (req, res) => {
  if(!req.body.title) {
    res.status(400);
    throw new Error('Fields required');
  } 

  const id = req.params.id
  const order = await OrderModel.updateOneOrder(req, id);

  if(!order) {
    res.status(500);
    throw new Error('Server error');
  }

  res.status(200).json({ status: 200, message: "Order updated", order: order });
})

// @desc Delete one order
// @route DELETE /api/v1/order/delete/:id
// @access PRIVATE
const deleteOneOrder = asyncHandler(async (req, res) => {
  const id = req.params.id
  const order = await OrderModel.deleteOneOrder(id);

  if(!order) {
    res.status(500);
    throw new Error('Server error');
  }

  res.status(200).json({ status: 200, message: "Order deleted" });
})

// @desc Get order detail by order cart id
// @route GET /api/v1/order/detail/:id
// @access AUTH
const getOrderDetailsByOrderCart = asyncHandler(async (req, res) => {
  const id = req.params.id
  const orders = await OrderDetailModel.getOrderDetailByOrderId(id);

  if(!orders) {
    res.status(500);
    throw new Error('Server error');
  }

  res.status(200).json({ status: 200, message: "OK", orders: orders});
})

module.exports = {
  createOrder,
  createOrderPayment,
  validateOrder,
  getAllOrders,
  getOrderDetailsByUser,
  getOneOrder,
  updateOneOrder,
  deleteOneOrder,
  getOrderDetailsByOrderCart
}
