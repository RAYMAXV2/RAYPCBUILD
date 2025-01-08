const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./database/auth_db');

// Middleware for reading JSON
app.use(express.json());

// Autorise CORS 
app.use(cors());

app.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT 1 + 1 AS sum');
      res.json({ message: 'Hello from backend!', sum: rows[0].sum });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur de connexion DB' });
    }
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server start on port : ${PORT}`);
});
