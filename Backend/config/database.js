const mysql = require('mysql2/promise');

// Database configuration - Updated to use environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '0621',
  database: process.env.DB_NAME || 'smart_campus',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Database connected successfully!');
    console.log(`�� Connected to: ${dbConfig.host}:${dbConfig.port}`);
    console.log(`👤 User: ${dbConfig.user}`);
    console.log(`🗄️  Database: ${dbConfig.database}`);
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('�� Make sure MySQL is running and the database exists');
  }
};

// No need to initialize tables since they already exist
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Just verify the connection works
    await connection.execute('SELECT 1');
    
    connection.release();
    console.log('🗄️  Connected to existing smart_campus database successfully!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
};

module.exports = {
  pool,
  testConnection,
  initializeDatabase
};