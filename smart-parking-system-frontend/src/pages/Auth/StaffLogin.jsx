import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Auth.css';

const StaffLogin = () => {
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = await login(formData.email, formData.password);

      if (data.success) {
        const user = data.user;
        if (user?.role === 'staff') {
          navigate('/staff/dashboard');
        } else {
          // Force logout because they aren't staff
          logout();
          setError('You are not authorized to login as staff. Please use the User or Admin login portals.');
        }
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">📋</div>
          <h1>Smart Parking</h1>
          <p style={{ color: '#6366f1', fontWeight: 'bold' }}>Staff Portal</p>
        </div>

        {error && (
          <div className="auth-error">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter staff email"
                disabled={loading}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter staff password"
                disabled={loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
          >
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Signing in...
              </>
            ) : (
              'Sign In as Staff'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Need a Staff account?{' '}
            <Link to="/staff/register" className="auth-link">
              Register here
            </Link>
          </p>
          <p style={{ marginTop: '10px' }}>
            Switch Portal:{' '}
            <Link to="/login" className="auth-link">User Portal</Link>
            {' | '}
            <Link to="/admin/login" className="auth-link">Admin Portal</Link>
          </p>
        </div>
      </div>

      <div className="auth-background">
        <div className="bg-element bg-1" style={{ background: 'rgba(99, 102, 241, 0.15)' }}></div>
        <div className="bg-element bg-2" style={{ background: 'rgba(79, 70, 229, 0.15)' }}></div>
        <div className="bg-element bg-3"></div>
      </div>
    </div>
  );
};

export default StaffLogin;
