const pool = require('../../config/db');
const logAudit = require('../../utils/audit_logger');

/* 🔹 GET LEADS */
exports.getLeads = async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM tb_leads_master_table ORDER BY lead_id DESC'
  );
  res.json(result.rows);
};

/* 🔹 CREATE LEAD */
exports.createLead = async (req, res) => {
  const { lead_name, lead_email, lead_phone, lead_status } = req.body;

  const result = await pool.query(
    `INSERT INTO tb_leads_master_table
     (lead_name, lead_email, lead_phone, lead_status, assigned_to)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [
      lead_name,
      lead_email,
      lead_phone,
      lead_status,
      req.user.empId,
    ]
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

  res.status(201).json(result.rows[0]);
};

/* 🔹 UPDATE LEAD */
exports.updateLead = async (req, res) => {
  const { id } = req.params;
  const { lead_name, lead_email, lead_phone, lead_status } = req.body;

  const old = await pool.query(
    'SELECT * FROM tb_leads_master_table WHERE lead_id=$1',
    [id]
  );

  if (!old.rows.length) {
    return res.status(404).json({ message: 'Lead not found' });
  }

  const updated = await pool.query(
    `UPDATE tb_leads_master_table
     SET lead_name=$1,
         lead_email=$2,
         lead_phone=$3,
         lead_status=$4,
         updated_at=NOW()
     WHERE lead_id=$5
     RETURNING *`,
    [lead_name, lead_email, lead_phone, lead_status, id]
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

/* 🔹 DELETE LEAD */
exports.deleteLead = async (req, res) => {
  const { id } = req.params;

  const old = await pool.query(
    'SELECT * FROM tb_leads_master_table WHERE lead_id=$1',
    [id]
  );

  if (!old.rows.length) {
    return res.status(404).json({ message: 'Lead not found' });
  }

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
