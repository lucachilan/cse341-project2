const express = require('express');

const router = express.Router();

const maintenanceController = require('../controllers/maintenance');
const validation = require('../middleware/validate');

router.get('/', maintenanceController.getAll);
router.get('/:id', maintenanceController.getSingle);
router.delete('/:id', maintenanceController.deleteMaintenance);
router.post('/', validation.saveMaintenance, maintenanceController.createMaintenance);
router.put('/:id', validation.saveMaintenance, maintenanceController.updateMaintenance);

module.exports = router;