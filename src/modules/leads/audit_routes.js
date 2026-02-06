const router = require('express').Router();
const auth = require('../../middleware/auth_middleware');
const role = require('../../middleware/role_middleware');
const pool = require('../../config/db');

router.use(auth);
router.use(role(['ADMIN']));

router.get('/', async (req, res) => {
  const result = await pool.query(
    `SELECT * FROM tb_audit_logs
     ORDER BY created_at DESC
     LIMIT 100`
  );
  res.json(result.rows);
});

module.exports = router;
