// ╔══════════════════════════════════════════════════════════════╗
// ║ VS CODE LOCATION: CLARASBEST / server.js                     ║
// ╚══════════════════════════════════════════════════════════════╝
const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. MIDDLEWARE
app.use(express.json());
app.use(cors()); // Allows your React app to talk to this server

// 2. DATABASE CONNECTION
// On Render, we use environment variables. Locally, it uses your Aiven strings.
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'mysql-38880adb-janine-batle10.e.aivencloud.com', 
    port: process.env.DB_PORT || 12590,
    user: process.env.DB_USER || 'avnadmin',
    password: process.env.DB_PASSWORD || 'AVNS_G2z57INXzp0GM7bXKVK', 
    database: process.env.DB_NAME || 'defaultdb',
    ssl: {
        // This looks for ca.pem in the same folder as server.js
        ca: fs.readFileSync(path.join(__dirname, 'ca.pem')),
    }
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.stack);
        return;
    }
    console.log('✅ Connected to Aiven MySQL Cloud!');
});

// 3. ROUTES

// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error' });
        if (results.length > 0) {
            res.json({ success: true, role: results[0].role, email: results[0].email });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    });
});

// Register Route
app.post('/register', (req, res) => {
    const { email, password, role } = req.body;
    const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    db.query(query, [email, password, role], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') return res.json({ success: false, message: 'Email already exists!' });
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, message: 'Account created successfully!' });
    });
});

// Admin Stats
app.get('/api/admin/stats', (req, res) => {
    const query = `
        SELECT 
            (SELECT COUNT(*) FROM users) as totalUsers,
            (SELECT IFNULL(SUM(total_price), 0) FROM orders WHERE status = 'Delivered') as totalSales
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

// Inventory / Orders
app.get('/api/admin/inventory', (req, res) => {
    const query = "SELECT * FROM orders ORDER BY id DESC";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Update Order Status
app.post('/api/update-order', (req, res) => {
    const { orderId, newStatus } = req.body;
    const query = "UPDATE orders SET status = ? WHERE id = ?";
    db.query(query, [newStatus, orderId], (err) => {
        if (err) return res.status(500).json({ success: false, message: 'Update failed' });
        res.json({ success: true, message: 'Status updated' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
