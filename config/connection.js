const {Client}  = require('pg');

const client = new Client({
  host: process.env.HOST,
  user: process.env.USERNAME,
  port: 5432,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
  logging: false
});

module.exports = {client};