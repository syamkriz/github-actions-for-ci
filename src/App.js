/**
 * src/App.js
 *
 * This is the root component of the application.
 * It manages the main application state, including admin login status and view toggling
 * between the public product list and the admin dashboard. It renders the
 * NavigationBar, ProductList (or AdminLogin/AdminDashboard based on state).
 */
import React, { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import ProductList from './components/ProductList';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import './App.css';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminView, setShowAdminView] = useState(false); // To toggle between store and admin

  useEffect(() => {
    // Check for token on initial load
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdminLoggedIn(true);
      // Optionally: verify token with backend here
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setShowAdminView(true); // Switch to admin view on login
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminLoggedIn(false);
    setShowAdminView(false); // Switch to store view on logout
  };
  
  const toggleView = () => {
    // Only allow toggle to admin view if logged in
    if (isAdminLoggedIn) {
        setShowAdminView(!showAdminView);
    } else {
        // If not logged in and trying to access admin, force login view
        setShowAdminView(true); 
    }
  }

  return (
    <div>
      <NavigationBar />
      <div style={{ padding: '10px', textAlign: 'center' }}>
        <button onClick={toggleView}>
          {showAdminView ? 'View Store' : 'Admin Panel'}
        </button>
      </div>

      {showAdminView ? (
        isAdminLoggedIn ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        <ProductList />
      )}
      {/* Footer or other components can go here */}
    </div>
  );
}

export default App;
