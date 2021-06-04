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



// const pool = new Pool({
//   user: process.env.dbUsername,
//   host: process.env.dbHost,
//   database: process.env.dbDatabase,
//   password: process.env.dbPassword,
//   port: process.env.dbPort
// });

const pool = new Pool({
    user: 'cvhuamkgjdeqib',
    host: 'ec2-3-212-75-25.compute-1.amazonaws.com',
    database: 'dbjuru4artr58i',
    password: 'eba5f9e3e5031bc397862b505fbeaf283bdde3dddace64cce3ca66b79c115e65',
    port: '5432'
  });

module.exports = pool;

