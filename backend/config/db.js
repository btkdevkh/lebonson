// const mysql = require('promise-mysql')

// const connection = mysql.createConnection({
//   host: process.env.HOST || "localhost",
//   user: process.env.USERDB || "root",
//   password: process.env.PASSWORD || "123456789",
//   database: process.env.DATABASE || "lebonson",
//   port: "3306"
// })

// module.exports = connection;

const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE
});

module.exports = pool;
