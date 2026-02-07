const pool = require('../../db/pool');

/* GET ALL */
exports.getLeads = async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM fn_get_all_leads()');
  res.json(rows);
};

/* CREATE */
exports.createLead = async (req, res) => {
  const { lead_name, lead_email, lead_phone, lead_status } = req.body;

  const { rows } = await pool.query(
    'SELECT fn_create_lead($1,$2,$3,$4,$5,$6) AS lead',
    [
      lead_name,
      lead_email,
      lead_phone,
      lead_status,
      req.user.empId,
      req.user.role,
    ]
  );

  res.status(201).json(rows[0].lead);
};

/* UPDATE */
exports.updateLead = async (req, res) => {
  const { id } = req.params;
  const { lead_name, lead_email, lead_phone, lead_status } = req.body;

  const { rows } = await pool.query(
    'SELECT fn_update_lead($1,$2,$3,$4,$5,$6,$7) AS lead',
    [
      id,
      lead_name,
      lead_email,
      lead_phone,
      lead_status,
      req.user.empId,
      req.user.role,
    ]
  );

  res.json(rows[0].lead);
};

/* DELETE */
exports.deleteLead = async (req, res) => {
  const { id } = req.params;

  await pool.query(
    'SELECT fn_delete_lead($1,$2,$3)',
    [id, req.user.empId, req.user.role]
  );

  res.json({ message: 'Deleted successfully' });
};
