// ================================================================
// 📁 LOCATION IN YOUR VS CODE:
//
//  CLARASBEST
//  ├── node_modules
//  ├── public
//  │    ├── admin_dashboard.html
//  │    ├── app.js                 ← NOT this file
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
//  ⚠️  The app.js inside /public is your OLD vanilla JS file.
//  ⚠️  THIS App.tsx is a DIFFERENT file in your React project.
//
//  👉 In your REACT PROJECT folder, find the file:
//       src / App.tsx
//  👉 OPEN it and REPLACE everything inside with this code.
//
//  WHAT THIS FILE DOES:
//  This is the React router. It decides which dashboard to show
//  based on the logged-in user's role (Admin/Staff/Customer).
// ================================================================

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import StaffDashboard from './components/StaffDashboard';
import './index.css';

interface User {
  email: string;
  role: 'Admin' | 'Staff' | 'Customer';
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('clarasBestUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('clarasBestUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('clarasBestUser');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={`/${user.role.toLowerCase()}`} replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/admin"
          element={
            user?.role === 'Admin' ? (
              <AdminDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/customer"
          element={
            user?.role === 'Customer' ? (
              <CustomerDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/staff"
          element={
            user?.role === 'Staff' ? (
              <StaffDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
