const express = require('express');

const router = express.Router();

const inventoryController = require('../controllers/inventory');
const validation = require('../middleware/validate');

router.get('/', inventoryController.getAll);
router.get('/:id', inventoryController.getSingle);
router.delete('/:id', inventoryController.deleteItem);
router.post('/', validation.saveInventory, inventoryController.createItem);
router.put('/:id', validation.saveInventory, inventoryController.updateItem);

module.exports = router;