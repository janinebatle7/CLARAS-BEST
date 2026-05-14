// ╔══════════════════════════════════════════════════════════════╗
// ║ CLARA'S BEST - BACKEND SERVER                                ║
// ║ FILE LOCATION: CLARASBEST/server.js                          ║
// ╚══════════════════════════════════════════════════════════════╝

import express from 'express';
import mysql from 'mysql2';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// ───────────────────────────────────────────────────────────────
// LOAD ENVIRONMENT VARIABLES
// ───────────────────────────────────────────────────────────────
dotenv.config();

// ───────────────────────────────────────────────────────────────
// FIX __dirname FOR ES MODULES
// ───────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ───────────────────────────────────────────────────────────────
// MIDDLEWARE
// ───────────────────────────────────────────────────────────────
app.use(express.json());

// Updated CORS to include your specific production and local environments
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://claras-best-frontend.onrender.com',
        'https://claras-best.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// ───────────────────────────────────────────────────────────────
// DATABASE CONNECTION
// ───────────────────────────────────────────────────────────────
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: fs.readFileSync(path.join(__dirname, 'ca.pem')),
    }
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        return;
    }
    console.log('✅ Connected to Aiven MySQL Cloud!');
});

// ───────────────────────────────────────────────────────────────
// SERVE FRONTEND STATIC FILES
// ───────────────────────────────────────────────────────────────
// This tells Express to look into the 'dist' folder (created by Vite)
// for your compiled Home.tsx and other React files.
app.use(express.static(path.join(__dirname, 'dist')));

// ───────────────────────────────────────────────────────────────
// API ROUTES
// ───────────────────────────────────────────────────────────────

app.get('/api/status', (req, res) => {
    res.json({
        message: "Clara's Best API is Live!",
        status: "Online",
        database: "Connected to Aiven MySQL"
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error' });
        if (results.length > 0) {
            return res.json({ success: true, role: results[0].role, email: results[0].email });
        }
        res.json({ success: false, message: 'Invalid credentials' });
    });
});

app.post('/register', (req, res) => {
    const { email, password, role } = req.body;
    const query = `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`;
    db.query(query, [email, password, role], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') return res.json({ success: false, message: 'Email already exists!' });
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, message: 'Account created successfully!' });
    });
});

app.get('/api/admin/stats', (req, res) => {
    const query = `
        SELECT 
            (SELECT COUNT(*) FROM users) AS totalUsers,
            (SELECT IFNULL(SUM(total_price), 0) FROM orders WHERE status = 'Delivered') AS totalSales
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

app.get('/api/admin/staff', (req, res) => {
    const query = `SELECT id, email, role FROM users WHERE role = 'staff'`;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/api/admin/sales', (req, res) => {
    const query = `SELECT * FROM orders WHERE status = 'Delivered' ORDER BY id DESC`;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/api/admin/inventory', (req, res) => {
    const query = `SELECT * FROM orders ORDER BY id DESC`;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/update-order', (req, res) => {
    const { orderId, newStatus } = req.body;
    const query = `UPDATE orders SET status = ? WHERE id = ?`;
    db.query(query, [newStatus, orderId], (err) => {
        if (err) return res.status(500).json({ success: false, message: 'Update failed' });
        res.json({ success: true, message: 'Status updated' });
    });
});

app.get('/api/customer/orders', (req, res) => {
    const { email } = req.query;
    const query = `SELECT * FROM orders WHERE customer_email = ? ORDER BY id DESC`;
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// ───────────────────────────────────────────────────────────────
// FALLBACK ROUTE - CRITICAL FOR HOME.TSX FRONT
// ───────────────────────────────────────────────────────────────
// This route ensures that if a user visits the root "/" or any 
// sub-page, the server sends the React index.html file. 
// React Router will then take over and show Home.tsx.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server active at port ${PORT}`);
});
