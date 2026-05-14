// ================================================================
// 📁 LOCATION IN YOUR VS CODE: src / App.tsx
// ================================================================

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home'; // Your new landing page
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
        {/* NEW FEATURE: Landing Page as the default view */}
        <Route path="/" element={<Home />} />

        {/* AUTH FEATURE: Login handles redirection based on role */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to={`/${user.role.toLowerCase()}`} replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* ADMIN DASHBOARD ROUTE */}
        <Route
          path="/admin"
          element={
            user?.role === 'Admin' ? (
              <AdminDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* CUSTOMER DASHBOARD ROUTE */}
        <Route
          path="/customer"
          element={
            user?.role === 'Customer' ? (
              <CustomerDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* STAFF DASHBOARD ROUTE */}
        <Route
          path="/staff"
          element={
            user?.role === 'Staff' ? (
              <StaffDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
