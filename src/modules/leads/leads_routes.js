const router = require('express').Router();
const auth = require('../../middleware/auth_middleware');
const role = require('../../middleware/role_middleware');
const controller = require('./leads_controller');

router.use(auth);

// Everyone can VIEW
router.get('/', controller.getLeads);

// Only ADMIN can CREATE
router.post('/', role(['ADMIN']), controller.createLead);

// Only ADMIN can UPDATE
router.put('/:id', role(['ADMIN']), controller.updateLead);

// Only ADMIN can DELETE
router.delete('/:id', role(['ADMIN']), controller.deleteLead);

module.exports = router;
