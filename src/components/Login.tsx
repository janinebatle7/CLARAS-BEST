// ================================================================
// 📁 LOCATION IN YOUR VS CODE:
//
//  CLARASBEST
//  ├── node_modules
//  ├── public
//  │    ├── admin_dashboard.html
//  │    ├── app.js
//  │    ├── customer_home.html
//  │    ├── index.html             ← this is your OLD login page
//  │    ├── staff_dashboard.html
//  │    └── style.css
//  ├── ca.pem
//  ├── clarasdb.sql
//  ├── package-lock.json
//  ├── package.json
//  └── server.js
//
//  👉 In your REACT PROJECT folder, find or create the file:
//       src / components / Login.tsx
//  👉 If "components" folder doesn't exist:
//     Right-click "src" → New Folder → name it: components
//  👉 Then right-click "components" → New File → Login.tsx
//  👉 PASTE this entire code into it.
//
//  WHAT THIS FILE DOES:
//  This is the React version of your public/index.html login page.
//  Calls POST /login and POST /register on your server.js.
// ================================================================

import { useState } from 'react';
import { UserCircle, Lock, Users, Wifi, WifiOff } from 'lucide-react';
import { apiLogin, apiRegister } from '../api';

interface LoginProps {
  onLogin: (user: { email: string; role: 'Admin' | 'Staff' | 'Customer' }) => void;
}

// These are fallback demo users — only used when server.js is NOT running
const FALLBACK_USERS = [
  { email: 'admin@clarasbest.com', password: 'admin123',    role: 'Admin'    as const },
  { email: 'staff@clarasbest.com', password: 'staff123',    role: 'Staff'    as const },
  { email: 'janine@email.com',     password: 'customer123', role: 'Customer' as const },
];

export default function Login({ onLogin }: LoginProps) {
  const [email,          setEmail]          = useState('');
  const [password,       setPassword]       = useState('');
  const [regRole,        setRegRole]        = useState<'Customer' | 'Staff' | 'Admin'>('Customer');
  const [error,          setError]          = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading,      setIsLoading]      = useState(false);
  const [serverOnline,   setServerOnline]   = useState<boolean | null>(null);

  // Calls POST /login → server.js → Aiven MySQL users table
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const data = await apiLogin(email, password);
      setServerOnline(true);
      if (data.success) {
        onLogin({ email: data.email, role: data.role });
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      // server.js is offline — use demo fallback
      setServerOnline(false);
      const found = FALLBACK_USERS.find(
        u => u.email === email && u.password === password
      );
      if (found) {
        onLogin({ email: found.email, role: found.role });
      } else {
        setError('Invalid credentials  (server offline — using demo mode)');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Calls POST /register → server.js → Aiven MySQL users table
  const handleRegister = async () => {
    if (!email || !password) {
      setError('Fill in Email and Password first to register.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const data = await apiRegister(email, password, regRole);
      setServerOnline(true);
      if (data.success) {
        setSuccessMessage(`Account created as ${regRole}! You can now login.`);
        setEmail('');
        setPassword('');
        setTimeout(() => setSuccessMessage(''), 4000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch {
      setServerOnline(false);
      setError('Cannot reach server.js — run: node server.js inside your CLARASBEST folder');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#FDF5E6' }}
    >
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8">

          {/* ── Logo ─────────────────────────────────────────── */}
          <div className="text-center mb-6">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3"
              style={{ backgroundColor: '#630330' }}
            >
              <UserCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: '#630330' }}>
              CLARA'S BEST
            </h1>
            <p className="text-sm mt-1 text-gray-500">Kakanin Ordering System</p>
          </div>

          {/* ── Server status pill ────────────────────────────── */}
          {serverOnline !== null && (
            <div
              className={`flex items-center justify-center gap-2 mb-4 py-2 px-4 rounded-full text-xs font-semibold mx-auto w-fit ${
                serverOnline
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {serverOnline ? (
                <><Wifi className="w-3 h-3" /> Connected to Aiven MySQL (server.js running)</>
              ) : (
                <><WifiOff className="w-3 h-3" /> Demo mode — server.js is offline</>
              )}
            </div>
          )}

          {/* ── Error / Success messages ──────────────────────── */}
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm bg-red-50 text-red-600 border border-red-200">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-3 rounded-lg text-sm bg-green-50 text-green-700 border border-green-200">
              {successMessage}
            </div>
          )}

          {/* ── Login form ────────────────────────────────────── */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-bold text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
              style={{ backgroundColor: '#630330' }}
            >
              {isLoading ? 'Logging in…' : 'Login'}
            </button>
          </form>

          
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-xs text-gray-400">Register New Account</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* ── Register ──────────────────────────────────────── */}
          <div className="space-y-3">
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500" />
              <select
                value={regRole}
                onChange={e => setRegRole(e.target.value as 'Customer' | 'Staff' | 'Admin')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none cursor-pointer appearance-none"
              >
                <option value="Customer">Customer</option>
                <option value="Staff">Staff</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-bold text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
              style={{ backgroundColor: '#D4AF37' }}
            >
              {isLoading ? 'Registering…' : 'Register'}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-3">
          server.js → <code>localhost:3000</code> | React → <code>localhost:5173</code>
        </p>
      </div>
    </div>
  );
}
