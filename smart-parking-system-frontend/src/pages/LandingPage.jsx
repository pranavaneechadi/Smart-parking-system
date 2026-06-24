import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Decorative Blur Elements */}
      <div className="bg-decorations">
        <div className="decor-bubble decor-bubble-1"></div>
        <div className="decor-bubble decor-bubble-2"></div>
        <div className="decor-bubble decor-bubble-3"></div>
      </div>

      {/* Hero Section */}
      <header className="landing-hero">
        <span className="hero-tagline">SMART PARKING MANAGEMENT SYSTEM</span>
        <h1>Reserve Your Parking Slot Instantly & Securely</h1>
        <p className="hero-subtitle">
          Eliminate parking stress. Browse nearby parking hubs, see real-time vacant slots, reserve your spot, and make quick card or QR-based payments from your dashboard.
        </p>
        <div className="hero-ctas">
          <Link to="/register" className="btn-primary-landing">
            Get Started (Free)
          </Link>
          <Link to="/login" className="btn-secondary-landing">
            Sign In to Account
          </Link>
        </div>
      </header>

      {/* Stats Section */}
      <section className="landing-stats">
        <div className="stats-glass-card">
          <div className="stat-item">
            <span className="stat-num">50+</span>
            <span className="stat-desc">Smart Parking Hubs</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">10k+</span>
            <span className="stat-desc">Reserved Spaces Booked</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">99.9%</span>
            <span className="stat-desc">Real-Time Accuracy</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">4.9★</span>
            <span className="stat-desc">User Rating</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-wrapper">
        <div className="section-header">
          <h2>Everything You Need For Hassle-Free Parking</h2>
          <p>Avoid driving around in circles looking for slots. We bring real-time parking spaces directly to your fingertips.</p>
        </div>
        <div className="features-grid">
          <div className="feature-glass-card">
            <div className="feature-icon-wrapper">📡</div>
            <h3>Live Slot Tracking</h3>
            <p>See exactly how many slots are empty for 2-wheelers, 4-wheelers, or heavy vehicles before arriving at the location.</p>
          </div>
          <div className="feature-glass-card">
            <div className="feature-icon-wrapper">💳</div>
            <h3>Cashless Payments</h3>
            <p>Make payments directly from your phone. Secure payment integration with QR codes ensures instant confirmation.</p>
          </div>
          <div className="feature-glass-card">
            <div className="feature-icon-wrapper">📱</div>
            <h3>QR Code Entry/Exit</h3>
            <p>Scan a single QR code on your dashboard to quickly check-in or check-out at our digital validation gates.</p>
          </div>
          <div className="feature-glass-card">
            <div className="feature-icon-wrapper">⏰</div>
            <h3>Overstay Notifications</h3>
            <p>Get automated alerts when your booked hours are about to expire and request instant extensions from the user panel.</p>
          </div>
        </div>
      </section>

      {/* Services & Pricing Section */}
      <section className="section-wrapper">
        <div className="section-header">
          <h2>Services & Category Pricing</h2>
          <p>We provide spaces tailored to different vehicle types. Check our base development hourly rates below.</p>
        </div>
        <div className="rates-container">
          <div className="rate-card">
            <div>
              <h3>2-Wheelers</h3>
              <div className="rate-icon">🏍️</div>
              <div className="price">₹20<span>/hour</span></div>
            </div>
            <ul>
              <li>Standard bikes & scooters</li>
              <li>Dedicated compact slots</li>
              <li>Underground shade</li>
            </ul>
          </div>

          <div className="rate-card featured">
            <span className="featured-badge">Popular</span>
            <div>
              <h3>4-Wheelers</h3>
              <div className="rate-icon">🚗</div>
              <div className="price">₹50<span>/hour</span></div>
            </div>
            <ul>
              <li>Hatchbacks, Sedans & SUVs</li>
              <li>Wide clearance spaces</li>
              <li>Valet assistance ready</li>
            </ul>
          </div>

          <div className="rate-card">
            <div>
              <h3>Heavy Vehicles</h3>
              <div className="rate-icon">🚚</div>
              <div className="price">₹100<span>/hour</span></div>
            </div>
            <ul>
              <li>Trucks, buses & large vans</li>
              <li>Extra-wide truck bays</li>
              <li>24/7 security surveillance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Locations Coverage */}
      <section className="section-wrapper">
        <div className="section-header">
          <h2>Covered Cities</h2>
          <p>Our smart network is actively expanding across major metropolitan areas.</p>
        </div>
        <div className="locations-list">
          <div className="location-tag">📍 Bangalore</div>
          <div className="location-tag">📍 Chandigarh</div>
          <div className="location-tag">📍 New Delhi</div>
          <div className="location-tag">📍 Mumbai</div>
          <div className="location-tag">📍 Pune</div>
          <div className="location-tag">📍 Hyderabad</div>
        </div>
      </section>

      {/* Call to action Banner */}
      <section className="landing-cta-banner">
        <h2>Ready to Park Smarter?</h2>
        <p>Join thousands of drivers who have simplified their daily commute. Register your account in just 2 minutes and book your first slot.</p>
        <Link to="/register" className="btn-primary-landing">
          Book Your Slot Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content-landing">
          <div className="footer-logo-landing">
            <span>🅿️</span> Smart Parking
          </div>
          <div className="footer-portals-landing">
            <Link to="/login">User Login</Link>
            <Link to="/staff/login">Staff Portal</Link>
            <Link to="/admin/login">Admin Portal</Link>
          </div>
          <div className="footer-copyright-landing">
            Smart Vehicle Parking System &copy; 2026. Built with modern web aesthetics.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
