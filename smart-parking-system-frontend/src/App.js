import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import UserHome from './pages/User/UserHome';
import UserParking from './pages/User/UserParking';
import PaymentPage from './pages/User/PaymentPage';
import BookingHistory from './pages/User/BookingHistory';
import Profile from './pages/User/Profile';
import Support from './pages/User/Support';

import AdminDashboard from './pages/Admin/AdminDashboard';

import StaffDashboard from './pages/Staff/StaffDashboard';

import Navbar from './components/Navbar';
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, isAdmin, isStaff, loading } = useAuth();

  if (loading) {
    return <div className="app-loading">Loading your workspace...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requiredRole === 'staff' && !isStaff) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

const RedirectToDashboard = () => {
  const { isAuthenticated, isAdmin, isStaff, loading } = useAuth();

  if (loading) {
    return <div className="app-loading">Loading your workspace...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (isStaff) {
    return <Navigate to="/staff/dashboard" replace />;
  }

  return <Navigate to="/bookings" replace />;
};

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="app-loading">Loading your workspace...</div>;
  }

  return (
    <Routes>
      {/* Auth Routes - redirect to home if already logged in */}
      <Route
        path="/login"
        element={isAuthenticated ? <RedirectToDashboard /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <RedirectToDashboard /> : <Register />}
      />

      {/* User Routes */}
      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <UserParking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment/:bookingId"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <UserHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings/history"
        element={
          <ProtectedRoute>
            <BookingHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/support"
        element={
          <ProtectedRoute>
            <Support />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Staff Routes */}
      <Route
        path="/staff/dashboard"
        element={
          <ProtectedRoute requiredRole="staff">
            <StaffDashboard />
          </ProtectedRoute>
        }
      />

      {/* Default Routes */}
      <Route path="/" element={<RedirectToDashboard />} />

      {/* 404 Not Found */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};



function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="app-container">
            <Navbar />
            <AppRoutes />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
