const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "@prema180805",
  database: "portal",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("Connected to the database");

module.exports = db;
