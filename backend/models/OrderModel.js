const mysql = require('../config/db')

let db;

mysql.then(conn => {
  setInterval(async() => {
    await conn.query("SELECT 1");
  }, 10000);

  db = conn
})

class OrderModel {
  static createOrder(user_id, totalAmount) {
    return db.query('INSERT INTO orders (user_id, totalAmount, creationTimestamp, status) VALUES (?, ?, NOW(), "Not Paid")', [user_id, totalAmount])
      .then(res => res)
      .catch(err => err)
  }

  static getAllOrders() {
    return db.query("SELECT * FROM orders")
      .then(res => res)
      .catch(err => err)
  }

  static getAllOrdersByUserId(id) {
    return db.query("SELECT * FROM orders WHERE user_id = ?", [id])
      .then(res => res)
      .catch(err => err)
  }

  static getOneOrder(id) {
    return db.query("SELECT * FROM orders WHERE id = ?", [id])
      .then(res => res)
      .catch(err => err)
  }

  static updateOneOrder(req, id) {
    return db.query("UPDATE orders SET totalAmount = ?, status = ?  WHERE id = ?", [req.body.totalAmount, id])
      .then(res => res)
      .catch(err => err)
  }

  static deleteOneOrder(id) {
    return db.query("DELETE FROM orders WHERE id = ?", [id])
      .then(res => res)
      .catch(err => err)
  }

  static updateTotalAmount(totalAmount, orders_id) {
    return db.query("UPDATE orders SET totalAmount = ? WHERE id = ?", [totalAmount, orders_id])
      .then(res => res)
      .catch(err => err)
  }

  static updateStatus(id) {
    return db.query("UPDATE orders SET status = 'Paid' WHERE id = ?", [id])
      .then(res => res)
      .catch(res => res)
  }
}

module.exports = OrderModel;
