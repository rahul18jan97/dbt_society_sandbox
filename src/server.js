const express = require('express');
const cors = require('cors');

const app = express();

/* 🔐 CORS — MUST BE BEFORE ROUTES */
app.use(cors({
  origin: [
    
    'https://sweet-gingersnap-eef4fc.netlify.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ❌ REMOVE app.options('*', cors());

app.use(express.json());

/* 📦 Routes */
app.use('/api/auth', require('./modules/auth/auth_routes'));
app.use('/api/leads', require('./modules/leads/leads_routes'));

/* 🚀 Server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
