const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Import from db.js

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/payees', async (req, res) => {
    const { name, accountNumber, sortCode } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO payees (name, account_number, sort_code) VALUES ($1, $2, $3) RETURNING *',
            [name, accountNumber, sortCode]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.listen(5000, () => console.log('Backend running on http://localhost:5000'));