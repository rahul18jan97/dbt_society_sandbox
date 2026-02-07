// const pool = require('../../config/db');
import pool, { query } from '../../config/db';
console.log('POOL 👉', pool);


/* GET ALL LEADS */
export async function getLeads(req, res) {
  try {
    const result = await query(
      'SELECT * FROM fn_get_leads()'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('GET LEADS ERROR 👉', err);
    res.status(500).json({ message: err.message });
  }
}

/* CREATE LEAD */
export async function createLead(req, res) {
  try {
    const { lead_name, lead_email, lead_phone, lead_status } = req.body;

    const result = await query(
      'SELECT fn_create_lead($1,$2,$3,$4,$5,$6)',
      [
        lead_name,
        lead_email,
        lead_phone,
        lead_status,
        req.user.empId,
        req.user.role,
      ]
    );

    res.status(201).json(result.rows[0].fn_create_lead);
  } catch (err) {
    console.error('CREATE ERROR 👉', err);
    res.status(500).json({ message: err.message });
  }
}

/* UPDATE LEAD */
export async function updateLead(req, res) {
  try {
    const { lead_name, lead_email, lead_phone, lead_status } = req.body;

    const result = await query(
      'SELECT fn_update_lead($1,$2,$3,$4,$5,$6,$7)',
      [
        req.params.id,
        lead_name,
        lead_email,
        lead_phone,
        lead_status,
        req.user.empId,
        req.user.role,
      ]
    );

    res.json(result.rows[0].fn_update_lead);
  } catch (err) {
    console.error('UPDATE ERROR 👉', err);
    res.status(500).json({ message: err.message });
  }
}

/* DELETE LEAD */
export async function deleteLead(req, res) {
  try {
    await query(
      'SELECT fn_delete_lead($1,$2,$3)',
      [
        req.params.id,
        req.user.empId,
        req.user.role,
      ]
    );

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('DELETE ERROR 👉', err);
    res.status(500).json({ message: err.message });
  }
}
