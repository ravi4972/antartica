const Pool = require('pg').Pool;
const env= require('dotenv');
env.config();

const pool = new Pool({
  user: process.env.dbUsername,
  host: process.env.dbHost,
  database: process.env.dbDatabase,
  password: process.env.dbPassword,
  port: process.env.dbPort,
  ssl: { rejectUnauthorized: false }
});


module.exports = pool;

