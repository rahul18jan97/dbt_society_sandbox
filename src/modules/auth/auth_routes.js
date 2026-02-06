const router = require('express').Router();
const controller = require('./auth_controller');

router.post('/login', controller.login);

module.exports = router;
