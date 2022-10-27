const db = require('../config/db')

class ProductModel {
  static createProduct(req) {
    const { title, price, image, quantity, description } = req.body
    return db.query("INSERT INTO product_lbs (title, price, image, quantity, creationTimestamp, description) VALUES($1, $2, $3, $4, NOW(), $5)", [title, price, image, quantity, description])
      .then(res => res)
      .catch(err => err)
  }

  static getAllProducts () {
    return db.query("SELECT * FROM product_lbs")
      .then(res => res)
      .catch(err => err)
  }

  static getOneProduct(id) {
    return db.query("SELECT * FROM product_lbs WHERE id = $1", [id])
      .then(res => res)
      .catch(err => err)
  }

  static updateOneProduct(req, id) {
    const { title, price, image, quantity, description } = req.body
    return db.query("UPDATE product_lbs SET title = $1, price = $2, image = $3, quantity = $4, description = $5  WHERE id = $6", [title, price, image, quantity, description, id])
      .then(res => res)
      .catch(err => err)
  }

  static deleteOneProduct(id) {
    return db.query("DELETE FROM product_lbs WHERE id = $1", [id])
      .then(res => res)
      .catch(err => err)
  }

  static getProductsByOrderId(order_id) {
    return db.query('SELECT order_id, product_id, orderDetail.total AS total, orderDetail.quantity AS selectedQty, product_lbs.quantity AS quantity, product_lbs.title FROM orderDetail INNER JOIN product_lbs ON orderDetail.product_id = product_lbs.id INNER JOIN orders ON orderDetail.order_id = orders.id WHERE order_id = $1', [order_id])
      .then(res => res)
      .catch(err => err)

  }

  static changeProductQuantity(newQuantity, id) {
    return db.query('UPDATE product_lbs SET quantity = $1 WHERE id = $2', [newQuantity, id])
      .then(res => res)
      .catch(err => err)
  }
}

module.exports = ProductModel
