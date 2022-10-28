const OrderModel = require("../models/OrderModel");
const OrderDetailModel = require("../models/OrderDetailModel");
const ProductModel = require("../models/ProductModel");
const asyncHandler = require('express-async-handler')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// @desc Create order
// @route POST /api/v1/order/create
// @access PRIVATE
const createOrder = asyncHandler(async (req, res) => {
  let totalAmounts = 0;

  const order = await OrderModel.createOrder(req.body.user_id, totalAmounts);

  if(!order) {
    res.status(500)
    throw new Error('Server error');
  }

  let order_id = order.rows[0].id

  let products = req.body.products;

  await Promise.all(products.map(async(product) => {
    let productInfo = await ProductModel.getOneProduct(product.id);

    // TVA
    let TVA = 0.5

    // Total price HT
    let totalEachHT = Number(productInfo.rows[0].price) * Number(product.selectedQuantity);

    let totaEachlTTC = (TVA * Number(product.selectedQuantity) + totalEachHT)

    totalAmounts += totaEachlTTC;

    await OrderDetailModel.createOrderDetail(order_id, product.id, product.selectedQuantity, totalEachHT);
    await OrderModel.updateTotalAmount(totalAmounts, order_id);
  }))

  res.status(200).json({ status: 200, message: "Order created", order: order.rows[0], order_id: order_id });
})

// @desc Create order checkout payment
// @route POST /create-checkout-session
// @access PRIVATE
const createOrderPayment = asyncHandler(async(req, res, next) => {
  try {
    let TVA = 0.5
    let products = req.body.products;
    let orderId = req.body.order_id;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: await Promise.all(products.map(async product =>  {
        let productInfo = await ProductModel.getOneProduct(product.id);

        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: product.title
            },
            unit_amount: Number(productInfo.rows[0].price + TVA) * 100
          },
          quantity: Number(product.selectedQuantity)
        }
      })),
      success_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/success?o_id=${Number(orderId)}`,
      cancel_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/`,
    })

    res.status(200).json({ url: session.url })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Func no-call anywhere, just compare with the new one above: ↑
// @desc Create order checkout payment
// @route POST /api/v1/order/payment
// @access PRIVATE
const createOrderPaymentOldVersion = asyncHandler(async(req, res, next) => {
  let order = await OrderModel.getOneOrder(req.body.order_id);

  if(!order.rows[0]) {
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

  if(!productsOrdered) {
    res.status(500);
    throw new Error('Server error');
  }

  productsOrdered.rows.map(async(product) => {
    let newQantity = parseInt(product.quantity) - parseInt(product.selectedQty);
    await ProductModel.changeProductQuantity(newQantity, product.product_id);
  })

  res.status(200).json({ status: 200, message: "status validé" });
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

  res.status(200).json({ status: 200, message: "OK", orders: orders.rows });
})

// @desc Get orders detail by user id
// @route GET /api/v1/order/user/:id
// @access PRIVATE
const getOrderDetailsByUser = asyncHandler(async (req, res) => {
  const id = req.params.id
  const ordersByUserId = await OrderModel.getAllOrdersByUserId(id);

  if(!ordersByUserId) {
    res.status(500);
    throw new Error('Server error');
  }

  res.status(200).json({ status: 200, message: "OK", ordersByUserId: ordersByUserId.rows });
})

// @desc Get one order
// @route GET /api/v1/order/:id
// @access PRIVATE
const getOneOrder = asyncHandler(async (req, res) => {
  const id = req.params.id
  const order = await OrderModel.getOneOrder(id);

  if(!order.rows[0]) {
    res.status(500);
    throw new Error('Server error');
  }

  res.status(200).json({ status: 200, message: "OK", order: order.rows[0] });
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

  res.status(200).json({ status: 200, message: "Order updated", order: order.rows[0] });
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

  res.status(200).json({ status: 200, message: "OK", orders: orders.rows[0] });
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
  getOrderDetailsByOrderCart,
  createOrderPaymentOldVersion
}
