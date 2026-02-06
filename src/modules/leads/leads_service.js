const pool = require('../../config/db');

async function getAllLeads() {
  const result = await pool.query(`SELECT * FROM tb_leads_master_table`);
  return result.rows;
}

async function createLead(data) {
  const { lead_name, lead_email, lead_phone, lead_status, assigned_to } = data;

  const result = await pool.query(
    `INSERT INTO tb_leads_master_table
     (lead_name, lead_email, lead_phone, lead_status, assigned_to)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [lead_name, lead_email, lead_phone, lead_status, assigned_to]
  );

  return result.rows[0];
}

async function updateLead(id, status) {
  const result = await pool.query(
    `UPDATE tb_leads_master_table
     SET lead_status = $1
     WHERE lead_id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
}

async function deleteLead(id) {
  await pool.query(
    `DELETE FROM tb_leads_master_table WHERE lead_id = $1`,
    [id]
  );
}

module.exports = {
  getAllLeads,
  createLead,
  updateLead,
  deleteLead,
};
