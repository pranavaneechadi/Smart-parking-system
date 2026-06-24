const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const os = require('os');
const http = require('http');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();


// ===== MIDDLEWARE =====

// ✅ SIMPLE CORS (BEST FOR DEVELOPMENT)
app.use(cors());

// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ===== ROUTES =====
const authRoutes = require('./routes/authRoutes');
const parkingRoutes = require('./routes/parkingRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const staffRoutes = require('./routes/staffRoutes');
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const startBookingCron = require('./services/bookingCron');

// Start Cron Jobs
startBookingCron();


// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Smart Vehicle Parking Backend API',
    version: '1.0.0',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/parking', parkingRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);


// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
  console.error('Error:', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});


// ===== START SERVER =====
const PORT = process.env.PORT || 5000;

// Get local network IP
const getNetworkIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      const family = typeof iface.family === 'string' ? iface.family : `IPv${iface.family}`;
      if (family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
};

// Check if frontend port is responding
const checkFrontendPort = (port) => {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}/`, { timeout: 500 }, (res) => {
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
};

app.listen(PORT, async () => {
  const networkIP = getNetworkIP();
  const localUrl = `http://localhost:${PORT}`;
  const networkUrl = networkIP ? `http://${networkIP}:${PORT}` : 'Not available';

  // Determine frontend port
  let defaultFrontendPort = 3000;
  if (process.env.CORS_ORIGIN) {
    try {
      const url = new URL(process.env.CORS_ORIGIN);
      if (url.port) {
        defaultFrontendPort = parseInt(url.port, 10);
      }
    } catch (e) {
      // Ignore URL parsing errors
    }
  }

  let frontendPort = defaultFrontendPort;
  const isDefaultReact = await checkFrontendPort(defaultFrontendPort);
  if (!isDefaultReact) {
    const altPort = defaultFrontendPort === 3000 ? 3001 : 3000;
    const isAltReact = await checkFrontendPort(altPort);
    if (isAltReact) {
      frontendPort = altPort;
    }
  }

  const frontendLocal = `http://localhost:${frontendPort}`;
  const frontendNetwork = networkIP ? `http://${networkIP}:${frontendPort}` : 'Not available';

  console.log(`
✅ Smart Vehicle Parking Backend Running
🌍 Mode: ${process.env.NODE_ENV || 'development'}
📊 MongoDB Connected

  Backend API:
  - Local:   \x1b[36m${localUrl}\x1b[0m
  - Network: \x1b[36m${networkUrl}\x1b[0m

  Frontend Website (Click below to open):
  - Local:   \x1b[32m${frontendLocal}\x1b[0m
  - Network: \x1b[32m${frontendNetwork}\x1b[0m
  `);
});
