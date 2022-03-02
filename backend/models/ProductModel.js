const mysql = require('../config/db')
let db;
mysql.then(conn => db = conn)

class ProductModel {
  static createProduct(req) {
    return db.query("INSERT INTO product (title, price, image, quantity, creationTimestamp, description) VALUES(?, ?, ?, ?, NOW(), ?)", [req.body.title, req.body.price, req.body.image, req.body.quantity, req.body.description])
      .then(res => res)
      .catch(err => err)
  }

  static getAllProducts () {
    return db.query("SELECT * FROM product")
      .then(res => res)
      .catch(err => err)
  }

  static getOneProduct(id) {
    return db.query("SELECT * FROM product WHERE id = ?", [id])
      .then(res => res)
      .catch(err => err)
  }

  static updateOneProduct(req, id) {
    return db.query("UPDATE product SET title = ?, price = ?, image = ?, quantity = ?, description = ?  WHERE id = ?", [req.body.title, req.body.price, req.body.image, req.body.quantity, req.body.description, id])
      .then(res => res)
      .catch(err => err)
  }

  static deleteOneProduct(id) {
    return db.query("DELETE FROM product WHERE id = ?", [id])
      .then(res => res)
      .catch(err => err)
  }

  static getProductsByOrderId(order_id) {
    return db.query('SELECT order_id, product_id, orderDetail.total AS total, orderDetail.quantity AS selectedQty, product.quantity AS quantity, product.title FROM orderDetail INNER JOIN product ON orderDetail.product_id = product.id INNER JOIN orders ON orderDetail.order_id = orders.id WHERE order_id = ?', [order_id])
      .then(res => res)
      .catch(err => err)

  }

  static changeProductQuantity(newQuantity, id) {
    return db.query('UPDATE product SET quantity = ? WHERE id = ?', [newQuantity, id])
      .then(res => res)
      .catch(err => err)
  }
}

module.exports = ProductModel
