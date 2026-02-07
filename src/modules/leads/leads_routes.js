const express = require('express');
const router = express.Router();

const {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} = require('./leads_controller');

router.get('/', getLeads);
router.post('/', createLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;
