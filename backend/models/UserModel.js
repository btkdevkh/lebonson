const mysql = require('../config/db')

let db;

mysql.then(conn => {
  setInterval(async() => {
    await conn.query("SELECT 1");
  }, 10000);

  db = conn
})

const saltRounds = 10;

class UserModel {
  static async createUser(req) {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    return db.query("INSERT INTO user (firstName, lastName, email, password, address, zip, city, creationTimestamp, role) VALUES(?, ?, ?, ?, ?, ?, ?, NOW(), 'User')", [req.body.firstName, req.body.lastName, req.body.email, hashedPassword, req.body.address, req.body.zip, req.body.city])
      .then(res => res)
      .catch(err => err)
  }

  static getAllUsers() {
    return db.query("SELECT * FROM user")
      .then(res => res)
      .catch(err => err)
  }

  static getOneUser(id) {
    return db.query("SELECT * FROM user WHERE id = ?", [id])
      .then(res => res)
      .catch(err => err)
  }

  static getUserByEmail(email) {
    return db.query("SELECT * FROM user WHERE email = ?", [email])
      .then(res => res)
      .catch(err => err)
  }

  static updateOneUser(req, id) {
    return db.query("UPDATE user SET firstName = ?, lastName = ?, email = ?, address = ?, zip = ?, city = ? WHERE id = ?", [req.body.firstName, req.body.lastName, req.body.email, req.body.address, req.body.zip, req.body.city, id])
      .then(res => res)
      .catch(err => err)
  }

  static updateOneUserRole(req, id) {
    return db.query("UPDATE user SET role = ? WHERE id = ?", [req.body.userRole, id])
      .then(res => res)
      .catch(err => err)
  }

  static async updateUserPassword(req, id) {
    const hash = await bcrypt.hash(req, saltRounds);
    
    return db.query("UPDATE user SET password = ? WHERE id = ?", [hash, id])
      .then(res => res)
      .catch(err => err)
  }

  static deleteOneUser(id) {
    return db.query("DELETE FROM user WHERE id = ?", [id])
      .then(res => res)
      .catch(err => err)
  }
}

module.exports = UserModel;
