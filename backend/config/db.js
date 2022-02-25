const mysql = require('promise-mysql')

const connection = mysql.createConnection({
  host: process.env.HOST || "localhost",
  user: process.env.USERDB || "root",
  password: process.env.PASSWORD || "",
  database: process.env.DATABASE || "lebonson",
  port: "3306"
})

module.exports = connection;
