const mysql = require("mysql2");

const MYSQL_USER = "root";
const MYSQL_PASSWORD = "admin";
const MYSQL_DATABASE = "ecommerce";
const MYSQL_HOST = "127.0.0.1";
const MYSQL_PORT= 3306;

const pool = mysql.createPool({
    user: MYSQL_USER,
    password:  MYSQL_PASSWORD,
    database:  MYSQL_DATABASE,
    host:  MYSQL_HOST,
    port:  MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;