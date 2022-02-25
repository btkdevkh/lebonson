const mysql = require('../config/db')
let db;
mysql.then(conn => db = conn)

class OrderDetailModel {
  static createOrderDetail(order_id, product_id, quantity, total) {
    return db.query('INSERT INTO orderDetail (order_id, product_id, quantity, total) VALUES (?, ?, ?, ?)', [order_id, product_id, quantity, total])
      .then(res => res)
      .catch(res => res)
  }

  static getOrderDetailByOrderId(order_id) {
    return db.query('SELECT * FROM orderDetail WHERE order_id = ?', [order_id])
      .then(res => res)
      .catch(res => res)
  }
}

module.exports = OrderDetailModel;
