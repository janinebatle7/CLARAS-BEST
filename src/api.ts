// ================================================================
// 📁 FILE LOCATION:
// src/api.ts
//
// PURPOSE:
// Centralized API calls for CLARA'S BEST frontend.
// Connects React frontend to Render backend API.
// ================================================================

// ✅ Backend URL from Render
export const API_BASE = 'https://claras-best.onrender.com';

// ────────────────────────────────────────────────────────────────
// LOGIN → POST /login
// ────────────────────────────────────────────────────────────────
export async function apiLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
}

// ────────────────────────────────────────────────────────────────
// REGISTER → POST /register
// ────────────────────────────────────────────────────────────────
export async function apiRegister(
  email: string,
  password: string,
  role: string
) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, role }),
  });

  return res.json();
}

// ────────────────────────────────────────────────────────────────
// ADMIN STATS → GET /api/admin/stats
// ────────────────────────────────────────────────────────────────
export async function apiGetStats() {
  const res = await fetch(`${API_BASE}/api/admin/stats`);

  return res.json();
}

// ────────────────────────────────────────────────────────────────
// ADMIN STAFF LIST → GET /api/admin/staff
// ────────────────────────────────────────────────────────────────
export async function apiGetStaff() {
  const res = await fetch(`${API_BASE}/api/admin/staff`);

  return res.json();
}

// ────────────────────────────────────────────────────────────────
// ADMIN SALES → GET /api/admin/sales
// ────────────────────────────────────────────────────────────────
export async function apiGetSales() {
  const res = await fetch(`${API_BASE}/api/admin/sales`);

  return res.json();
}

// ────────────────────────────────────────────────────────────────
// INVENTORY → GET /api/admin/inventory
// ────────────────────────────────────────────────────────────────
export async function apiGetInventory() {
  const res = await fetch(`${API_BASE}/api/admin/inventory`);

  return res.json();
}

// ────────────────────────────────────────────────────────────────
// UPDATE ORDER → POST /api/update-order
// ────────────────────────────────────────────────────────────────
export async function apiUpdateOrder(
  orderId: number,
  newStatus: string
) {
  const res = await fetch(`${API_BASE}/api/update-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId, newStatus }),
  });

  return res.json();
}

// ────────────────────────────────────────────────────────────────
// CUSTOMER ORDERS → GET /api/customer/orders?email=
// ────────────────────────────────────────────────────────────────
export async function apiGetCustomerOrders(email: string) {
  const res = await fetch(
    `${API_BASE}/api/customer/orders?email=${encodeURIComponent(email)}`
  );

  return res.json();
}
