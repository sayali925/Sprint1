const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function initializeDatabase() {
  let connection;
  
  try {
    console.log('Initializing database...');
    
    // Create connection without database name first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });
    
    // Create database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS campus_dine');
    console.log('Database created or already exists');
    
    // Use the database
    await connection.query('USE campus_dine');
    
    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split the schema into individual statements (skip the first two lines that create and use the database)
    const statements = schema
      .split(';')
      .filter(statement => statement.trim() !== '')
      .filter(statement => !statement.includes('CREATE DATABASE') && !statement.includes('USE campus_dine'));
    
    // Execute each statement
    for (const statement of statements) {
      await connection.query(statement + ';');
    }
    
    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    // Close the connection
    if (connection) await connection.end();
  }
}

// Run the initialization
initializeDatabase();