const db = require('../config/db')

class OrderDetailModel {
  static createOrderDetail(order_id, product_id, quantity, total) {
    return db.query("INSERT INTO orderDetail_lbs (order_id, product_id, quantity, total) VALUES ($1, $2, $3, $4) RETURNING *", [order_id, product_id, quantity, total])
      .then(res => res)
      .catch(res => res)
  }

  static getOrderDetailByOrderId(order_id) {
    return db.query('SELECT * FROM orderDetail_lbs WHERE order_id = $1', [order_id])
      .then(res => res)
      .catch(res => res)
  }
}

module.exports = OrderDetailModel;
