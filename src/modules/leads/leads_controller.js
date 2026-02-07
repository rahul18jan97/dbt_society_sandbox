// src/modules/leads/leads_controller.js
const pool = require('../../config/db'); // adjust path to your db.js

exports.createLead = async (req, res) => {
  const { lead_name, lead_email, lead_phone, lead_status } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO leads (lead_name, lead_email, lead_phone, lead_status) VALUES ($1, $2, $3, $4) RETURNING *',
      [lead_name, lead_email, lead_phone, lead_status]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const service = require('./leads_service');

exports.getLeads = async (req, res) => {
  res.json(await service.getAllLeads());
};
const logAudit = require('../../utils/audit_logger');


exports.createLead = async (req, res) => {
  const { lead_name, lead_email, lead_status } = req.body;

  const result = await pool.query(
    `INSERT INTO tb_leads_master_table
     (lead_name, lead_email, lead_status)
     VALUES ($1,$2,$3) RETURNING *`,
    [lead_name, lead_email, lead_status]
  );

  await logAudit({
    empId: req.user.empId,
    role: req.user.role,
    action: 'CREATE',
    entity: 'LEAD',
    entityId: result.rows[0].lead_id,
    newData: result.rows[0],
    ip: req.ip,
  });

  res.json(result.rows[0]);
};

// exports.createLead = async (req, res) => {
//   res.status(201).json(await service.createLead(req.body));
// };

// exports.updateLead = async (req, res) => {
//   res.json(await service.updateLead(req.params.id, req.body.status));
// };
exports.updateLead = async (req, res) => {
  const { id } = req.params;

  const old = await pool.query(
    'SELECT * FROM tb_leads_master_table WHERE lead_id=$1',
    [id]
  );

  const updated = await pool.query(
    `UPDATE tb_leads_master_table
     SET lead_name=$1, lead_email=$2, lead_status=$3
     WHERE lead_id=$4 RETURNING *`,
    [
      req.body.lead_name,
      req.body.lead_email,
      req.body.lead_status,
      id,
    ]
  );

  await logAudit({
    empId: req.user.empId,
    role: req.user.role,
    action: 'UPDATE',
    entity: 'LEAD',
    entityId: id,
    oldData: old.rows[0],
    newData: updated.rows[0],
    ip: req.ip,
  });

  res.json(updated.rows[0]);
};


// exports.deleteLead = async (req, res) => {
//   await service.deleteLead(req.params.id);
//   res.sendStatus(204);
// };
exports.deleteLead = async (req, res) => {
  const { id } = req.params;

  const old = await pool.query(
    'SELECT * FROM tb_leads_master_table WHERE lead_id=$1',
    [id]
  );

  await pool.query(
    'DELETE FROM tb_leads_master_table WHERE lead_id=$1',
    [id]
  );

  await logAudit({
    empId: req.user.empId,
    role: req.user.role,
    action: 'DELETE',
    entity: 'LEAD',
    entityId: id,
    oldData: old.rows[0],
    ip: req.ip,
  });

  res.json({ message: 'Deleted successfully' });
};
