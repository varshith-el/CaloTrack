const { Pool } = require('pg');
const config = require('config');

// Import pg-promise
const pgp = require('pg-promise')();

const dbConfig = config.get('db');

const pool = new Pool(dbConfig);

module.exports = async function connectDB() {
  try {
    await pool.connect();
    console.log('Database connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};



// Create a new database instance
const db = pgp(dbConfig);

// Export the database instance
module.exports = db;