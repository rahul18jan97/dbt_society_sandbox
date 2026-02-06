const express = require('express');
const cors = require('cors');

const authRoutes = require('./modules/auth/auth_routes');
const leadsRoutes = require('./modules/leads/leads_routes');
const auditRoutes = require('./modules/leads/audit_routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/audit', auditRoutes);

module.exports = app;
