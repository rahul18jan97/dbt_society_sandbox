const router = require('express').Router();
const auth = require('../../middleware/auth_middleware');
const role = require('../../middleware/role_middleware');
const controller = require('./leads_controller');

router.use(auth);

router.get('/', controller.getLeads);
router.post('/', role('ADMIN'), controller.createLead);
router.put('/:id', role('ADMIN'), controller.updateLead);
router.delete('/:id', role('ADMIN'), controller.deleteLead);

module.exports = router;
