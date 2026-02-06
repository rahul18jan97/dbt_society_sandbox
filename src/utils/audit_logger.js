const pool = require('../config/db');

async function logAudit({
  empId,
  role,
  action,
  entity,
  entityId = null,
  oldData = null,
  newData = null,
  ip = null,
}) {
  await pool.query(
    `INSERT INTO tb_audit_logs
     (emp_id, emp_role, action, entity, entity_id, old_data, new_data, ip_address)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      empId,
      role,
      action,
      entity,
      entityId,
      oldData,
      newData,
      ip,
    ]
  );
}

module.exports = logAudit;
