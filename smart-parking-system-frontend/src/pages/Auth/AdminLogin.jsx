import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Auth.css';

const AdminLogin = () => {
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
        if (user?.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          // Force logout because they aren't an admin
          logout();
          setError('You are not authorized to login as an admin. Please use the User or Staff login portals.');
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
          <div className="auth-icon">🛡️</div>
          <h1>Smart Parking</h1>
          <p style={{ color: '#ec4899', fontWeight: 'bold' }}>Admin Portal</p>
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
                placeholder="Enter admin email"
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
                placeholder="Enter admin password"
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
            style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}
          >
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Signing in...
              </>
            ) : (
              'Sign In as Admin'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Need an Admin account?{' '}
            <Link to="/admin/register" className="auth-link">
              Register here
            </Link>
          </p>
          <p style={{ marginTop: '10px' }}>
            Switch Portal:{' '}
            <Link to="/login" className="auth-link">User Portal</Link>
            {' | '}
            <Link to="/staff/login" className="auth-link">Staff Portal</Link>
          </p>
        </div>
      </div>

      <div className="auth-background">
        <div className="bg-element bg-1" style={{ background: 'rgba(236, 72, 153, 0.15)' }}></div>
        <div className="bg-element bg-2" style={{ background: 'rgba(244, 63, 94, 0.15)' }}></div>
        <div className="bg-element bg-3"></div>
      </div>
    </div>
  );
};

export default AdminLogin;
