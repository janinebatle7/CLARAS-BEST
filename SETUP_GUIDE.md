# Clara's Best — Full Setup Guide

## Your Two Projects Side-by-Side

```
C:\Users\joana\ClarasBest\
│
├── server.js          ← YOUR EXISTING BACKEND (keep this!)
├── ca.pem             ← Aiven SSL certificate (keep this!)
├── package.json       ← has express, mysql2, etc.
│
├── public\            ← old HTML files (no longer needed)
│    ├── index.html
│    ├── admin_dashboard.html
│    ├── staff_dashboard.html
│    └── customer_home.html
│
└── react-app\         ← THIS React project (new frontend)
     ├── src\
     │    ├── api.ts              ← API calls to your server.js
     │    ├── App.tsx             ← routing / login state
     │    └── components\
     │         ├── Login.tsx           → POST /login, POST /register
     │         ├── AdminDashboard.tsx  → GET /api/admin/stats, /staff, /sales, /inventory
     │         ├── StaffDashboard.tsx  → GET /api/admin/inventory, POST /api/update-order
     │         └── CustomerDashboard.tsx → GET /api/customer/orders
     ├── index.html
     └── package.json
```

---

## Step 1 — Add CORS to your server.js

Open `C:\Users\joana\ClarasBest\server.js` and add these two lines
**right after** `const app = express();`:

```js
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));
```

Then install the cors package (run once in your ClarasBest folder):
```bash
cd C:\Users\joana\ClarasBest
npm install cors
```

---

## Step 2 — Start your backend

In Terminal 1 (PowerShell):
```bash
cd C:\Users\joana\ClarasBest
node server.js
```
You should see:
```
Connected to Aiven MySQL Cloud!
CLARA'S BEST active at http://localhost:3000
```

---

## Step 3 — Start the React frontend

In Terminal 2 (a new PowerShell window):
```bash
cd C:\Users\joana\ClarasBest\react-app
npm run dev
```
Then open: **http://localhost:5173**

---

## How the connection works

```
React (port 5173)
    │
    │  fetch('/login')          ← no full URL needed
    │  fetch('/api/admin/stats')
    │
    ▼
Vite Dev Server (proxy)
    │
    │  forwards all /api, /login, /register → port 3000
    │
    ▼
Your server.js (port 3000)
    │
    ▼
Aiven MySQL Cloud ☁️
```

The Vite proxy is configured in `vite.config.ts` — it automatically
forwards any request that starts with `/api`, `/login`, or `/register`
from the React dev server straight to your `node server.js`.

---

## Login Credentials (from your Aiven MySQL `users` table)

Use the email/password you registered via the old `index.html`.
If you haven't registered yet, use the Register form on the login page.

| Role     | Example email              |
|----------|---------------------------|
| Admin    | admin@clarasbest.com      |
| Staff    | staff@clarasbest.com      |
| Customer | janine@email.com          |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Demo mode" shown in UI | server.js is not running — do Step 2 |
| CORS error in browser console | Add cors middleware — do Step 1 |
| "Connected to Aiven MySQL Cloud!" not showing | Check ca.pem path in server.js |
| Login fails | Make sure your users table has the right email/password |
