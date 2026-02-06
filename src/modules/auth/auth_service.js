const pool = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(email, password) {
  const result = await pool.query(
    `SELECT emp_id, emp_name, emp_email, emp_password, emp_role
     FROM tb_emp_master_table
     WHERE emp_email = $1 AND is_active = true`,
    [email]
  );

  if (result.rowCount === 0) {
    throw new Error('Invalid email or password');
  }

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.emp_password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { empId: user.emp_id, role: user.emp_role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    token,
    user: {
      emp_id: user.emp_id,
      emp_name: user.emp_name,
      emp_email: user.emp_email,
      emp_role: user.emp_role,
    },
  };
}

module.exports = { login };
