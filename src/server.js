const express = require('express');
const cors = require('cors');

const app = express();

/* 🔐 CORS — MUST BE BEFORE ROUTES */
app.use(cors({
  origin: [
    'http://localhost:5173',          // Flutter web local
    'http://localhost:3000',          // optional
    'https://sweet-gingersnap-eef4fc.netlify.app/'   // replace with real Netlify URL
  ],
  credentials: true,
}));

app.use(express.json());

/* 📦 Routes */
app.use('/api/auth', require('./modules/auth/auth_routes'));
app.use('/api/leads', require('./modules/leads/leads_routes'));

/* 🚀 Server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
