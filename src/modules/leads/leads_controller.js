// const pool = require('../../config/db');
// console.log('POOL 👉', pool);

// // Controller functions
// const getLeads = async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM fn_get_leads()');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('GET LEADS ERROR 👉', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// const createLead = async (req, res) => {
//   try {
//     const { lead_name, lead_email, lead_phone, lead_status } = req.body;

//     const result = await pool.query(
//       'SELECT fn_create_lead($1,$2,$3,$4,$5,$6)',
//       [
//         lead_name,
//         lead_email,
//         lead_phone,
//         lead_status || 'NEW', // Default to NEW if not provided
//         req.user?.empId || 1, // Fallback for testing
//         req.user?.role || 'user',
//       ]
//     );

//     res.status(201).json(result.rows[0].fn_create_lead);
//   } catch (err) {
//     console.error('CREATE ERROR 👉', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// const updateLead = async (req, res) => {
//   try {
//     const { lead_name, lead_email, lead_phone, lead_status } = req.body;

//     const result = await pool.query(
//       'SELECT fn_update_lead($1,$2,$3,$4,$5,$6,$7)',
//       [
//         req.params.id,
//         lead_name,
//         lead_email,
//         lead_phone,
//         lead_status,
//         req.user?.empId || 1,
//         req.user?.role || 'user',
//       ]
//     );

//     res.json(result.rows[0].fn_update_lead);
//   } catch (err) {
//     console.error('UPDATE ERROR 👉', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// const deleteLead = async (req, res) => {
//   try {
//     await pool.query(
//       'SELECT fn_delete_lead($1,$2,$3)',
//       [
//         req.params.id,
//         req.user?.empId || 1,
//         req.user?.role || 'user',
//       ]
//     );

//     res.json({ message: 'Deleted successfully' });
//   } catch (err) {
//     console.error('DELETE ERROR 👉', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Export ALL functions at the end
// module.exports = {
//   getLeads,
//   createLead,
//   updateLead,
//   deleteLead,
// };
// ✅ TOP LEVEL - pool is available to ALL functions
const pool= require('../../config/db');
console.log('✅ POOL LOADED IN CONTROLLER:', pool !== undefined);

const getLeads = async (req, res) => {
  try {
    console.log('🌐 GET LEADS CALLED');
    const result = await pool.query('SELECT * FROM fn_get_leads()');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ GET LEADS ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const createLead = async (req, res) => {
  try {
    console.log('🌐 CREATE LEAD CALLED:', req.body);
    const { lead_name, lead_email, lead_phone, lead_status } = req.body;
    
    const result = await pool.query(
      'SELECT fn_create_lead($1,$2,$3,$4,$5,$6)',
      [lead_name, lead_email, lead_phone, lead_status || 'NEW', 1, 'user']
    );
    
    res.status(201).json(result.rows[0].fn_create_lead);
  } catch (err) {
    console.error('❌ CREATE LEAD ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const updateLead = async (req, res) => {
  try {
    console.log('🌐 UPDATE LEAD CALLED:', req.params.id, req.body);
    const { lead_name, lead_email, lead_phone, lead_status } = req.body;
    
    const result = await pool.query(
      'SELECT fn_update_lead($1,$2,$3,$4,$5,$6,$7)',
      [req.params.id, lead_name, lead_email, lead_phone, lead_status, 1, 'user']
    );
    
    res.json(result.rows[0].fn_update_lead);
  } catch (err) {
    console.error('❌ UPDATE LEAD ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const deleteLead = async (req, res) => {
  try {
    console.log('🌐 DELETE LEAD CALLED:', req.params.id);
    await pool.query('SELECT fn_delete_lead($1,$2,$3)', [req.params.id, 1, 'user']);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('❌ DELETE LEAD ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ ONLY export functions at BOTTOM
module.exports = { getLeads, createLead, updateLead, deleteLead };
