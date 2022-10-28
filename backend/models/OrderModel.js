const db = require('../config/db')

class OrderModel {
  static createOrder(user_id, totalAmount) {
    return db.query("INSERT INTO orders_lbs (user_id, totalAmount, creationTimestamp, status) VALUES ($1, $2, NOW(), 'Not Paid') RETURNING *", [user_id, totalAmount])
      .then(res => res)
      .catch(err => err)
  }

  static getAllOrders() {
    return db.query("SELECT * FROM orders_lbs")
      .then(res => res)
      .catch(err => err)
  }

  static getAllOrdersByUserId(id) {
    return db.query("SELECT * FROM orders_lbs WHERE user_id = $1", [id])
      .then(res => res)
      .catch(err => err)
  }

  static getOneOrder(id) {
    return db.query("SELECT * FROM orders_lbs WHERE id = $1", [id])
      .then(res => res)
      .catch(err => err)
  }

  static updateOneOrder(req, id) {
    return db.query("UPDATE orders_lbs SET totalAmount = $1, status = $2  WHERE id = $3 RETURNING *", [req.body.totalAmount, id])
      .then(res => res)
      .catch(err => err)
  }

  static deleteOneOrder(id) {
    return db.query("DELETE FROM orders_lbs WHERE id = $1", [id])
      .then(res => res)
      .catch(err => err)
  }

  static updateTotalAmount(totalAmount, orders_id) {
    return db.query("UPDATE orders_lbs SET totalAmount = $1 WHERE id = $2 RETURNING *", [totalAmount, orders_id])
      .then(res => res)
      .catch(err => err)
  }

  static updateStatus(id) {
    return db.query("UPDATE orders_lbs SET status = 'Paid' WHERE id = $1 RETURNING *", [id])
      .then(res => res)
      .catch(res => res)
  }
}

module.exports = OrderModel;
