// ================================================================
// 📁 LOCATION IN YOUR VS CODE:
//
//  CLARASBEST
//  ├── node_modules
//  ├── public
//  │    ├── admin_dashboard.html
//  │    ├── app.js
//  │    ├── customer_home.html
//  │    ├── index.html
//  │    ├── staff_dashboard.html
//  │    └── style.css
//  ├── ca.pem
//  ├── clarasdb.sql
//  ├── package-lock.json
//  ├── package.json
//  └── server.js
//
//  ⚠️  THIS FILE DOES NOT EXIST YET IN YOUR CLARASBEST FOLDER.
//  ⚠️  You are working inside a SEPARATE React project folder.
//
//  👉 In your REACT PROJECT folder, find the file:
//       src / api.ts
//  👉 If it doesn't exist, right-click the "src" folder
//     → New File → name it:  api.ts
//  👉 Then PASTE this entire code into it.
//
//  WHAT THIS FILE DOES:
//  All fetch() calls to your server.js live here.
//  server.js runs at http://localhost:3000
//  Every dashboard imports functions from this file.
// ================================================================

const API_BASE = 'http://localhost:3000';

// Replace with your actual Backend URL from Render
export const API_BASE = 'https://claras-backend.onrender.com'; 

// ── LOGIN  →  hits POST /login in your server.js ─────────────
export async function apiLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

// ── REGISTER  →  hits POST /register in your server.js ───────
export async function apiRegister(email: string, password: string, role: string) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  return res.json();
}

// ── ADMIN STATS  →  hits GET /api/admin/stats ─────────────────
export async function apiGetStats() {
  const res = await fetch(`${API_BASE}/api/admin/stats`);
  return res.json();
}

// ── ADMIN USER LIST  →  hits GET /api/admin/staff ─────────────
export async function apiGetStaff() {
  const res = await fetch(`${API_BASE}/api/admin/staff`);
  return res.json();
}

// ── ADMIN SALES  →  hits GET /api/admin/sales ─────────────────
export async function apiGetSales() {
  const res = await fetch(`${API_BASE}/api/admin/sales`);
  return res.json();
}

// ── INVENTORY  →  hits GET /api/admin/inventory ───────────────
export async function apiGetInventory() {
  const res = await fetch(`${API_BASE}/api/admin/inventory`);
  return res.json();
}

// ── UPDATE ORDER  →  hits POST /api/update-order ──────────────
export async function apiUpdateOrder(orderId: number, newStatus: string) {
  const res = await fetch(`${API_BASE}/api/update-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, newStatus }),
  });
  return res.json();
}

// ── CUSTOMER ORDERS  →  hits GET /api/customer/orders?email= ──
export async function apiGetCustomerOrders(email: string) {
  const res = await fetch(
    `${API_BASE}/api/customer/orders?email=${encodeURIComponent(email)}`
  );
  return res.json();
}
