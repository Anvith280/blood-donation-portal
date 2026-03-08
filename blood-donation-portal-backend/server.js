require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

// This allows your frontend HTML to talk to this backend
app.use(cors());
app.use(express.json());

// Connect to Aiven MySQL
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(() => console.log('✅ Connected to Aiven MySQL!'))
  .catch((err) => console.error('❌ Database connection failed:', err));


// --- API ROUTES FOR DONORS ---

// Get all donors
app.get('/api/donors', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM donors ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new donor
app.post('/api/donors', async (req, res) => {
  const { name, bg, type, city, state, phone, email, age, gender } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO donors (name, bg, type, city, state, phone, email, age, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, bg, type, city, state, phone, email, age, gender]
    );
    res.status(201).json({ id: result.insertId, message: 'Donor added successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// --- API ROUTES FOR REQUIREMENTS ---

// Get all requirements
app.get('/api/requirements', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM requirements ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new requirement
app.post('/api/requirements', async (req, res) => {
  const { name, bg, type, city, state, phone, hospital, urgency } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO requirements (name, bg, type, city, state, phone, hospital, urgency) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, bg, type, city, state, phone, hospital, urgency]
    );
    res.status(201).json({ id: result.insertId, message: 'Requirement added successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});