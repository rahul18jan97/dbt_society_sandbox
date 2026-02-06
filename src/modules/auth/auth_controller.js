const authService = require('./auth_service');

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}

module.exports = { login };
