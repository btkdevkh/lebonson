const bcrypt = require('bcrypt')
const db = require('../config/db')

const saltRounds = 10;

class UserModel {
  static async createUser(req) {
    const { firstname, lastname, email, password, address, zip, city } = req.body
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return db.query("INSERT INTO user_lbs (firstname, lastname, email, password, address, zip, city, creationtimestamp, role) VALUES($1, $2, $3, $4, $5, $6, $7, NOW(), 'User') RETURNING *", [firstname, lastname, email, hashedPassword, address, zip, city])
      .then(res => res)
      .catch(err => err)
  }

  static getAllUsers() {
    return db.query("SELECT * FROM user_lbs")
      .then(res => res)
      .catch(err => err)
  }

  static getOneUser(id) {
    return db.query("SELECT * FROM user_lbs WHERE id = $1", [id])
      .then(res => res)
      .catch(err => err)
  }

  static getUserByEmail(email) {
    return db.query("SELECT * FROM user_lbs WHERE email = $1", [email])
      .then(res => res)
      .catch(err => err)
  }

  static updateOneUser(req, id) {
    const { firstname, lastname, email, address, zip, city } = req.body
    return db.query("UPDATE user_lbs SET firstname = $1, lastname = $2, email = $3, address = $4, zip = $5, city = $6 WHERE id = $7", [firstname, lastname, email, address, zip, city, id])
      .then(res => res)
      .catch(err => err)
  }

  static updateOneUserRole(role, id) {
    return db.query("UPDATE user_lbs SET role = $1 WHERE id = $2", [role, id])
      .then(res => res)
      .catch(err => err)
  }

  static async updateUserPassword(password, id) {
    const hash = await bcrypt.hash(password, saltRounds);
    
    return db.query("UPDATE user_lbs SET password = $1 WHERE id = $2", [hash, id])
      .then(res => res)
      .catch(err => err)
  }

  static deleteOneUser(id) {
    return db.query("DELETE FROM user_lbs WHERE id = $1", [id])
      .then(res => res)
      .catch(err => err)
  }
}

module.exports = UserModel;
