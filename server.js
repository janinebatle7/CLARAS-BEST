// ╔══════════════════════════════════════════════════════════════╗
// ║ VS CODE LOCATION: CLARASBEST / server.js                     ║
// ╚══════════════════════════════════════════════════════════════╝
import express from 'express';
import mysql from 'mysql2';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 1. MIDDLEWARE
app.use(express.json());
// CORS updated to be more compatible with Render deployments
app.use(cors()); 

// 2. DATABASE CONNECTION
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

// NEW: Root route to fix "Cannot GET /"
app.get('/', (req, res) => {
    res.json({
        message: "Clara's Best API is Live!",
        status: "Online",
        database: "Connected to Aiven MySQL"
    });
});

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

app.use(cors({
    origin: 'https://claras-best.onrender.com' // Replace with your Frontend URL
}));

app.listen(PORT, () => {
    console.log(`🚀 Server active at port ${PORT}`);
});
