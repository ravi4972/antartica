//const mySql = require('mysql2');
const Pool = require('pg').Pool
const env= require('dotenv');
env.config();

// const connection= mySql.createConnection({
//     host: process.env.dbHost,
//     user: process.env.dbUsername,
//     password: process.env.dbPassword,
//     database: 'sys'
// })

// module.exports = connection;



const pool = new Pool({
  user: process.env.dbUsername,
  host: process.env.dbHost,
  database: process.env.dbDatabase,
  password: process.env.dbPassword,
  port: process.env.dbPort
});

module.exports = pool;

