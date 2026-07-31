const express = require('express');

const router = express.Router();

const inventoryController = require('../controllers/inventory');
const validation = require('../middleware/validate');
const { isAuthenticated }= require('../middleware/authenticate');

router.get('/', inventoryController.getAll);
router.get('/:id', inventoryController.getSingle);
router.post('/', isAuthenticated, validation.saveInventory, inventoryController.createItem);
router.put('/:id', isAuthenticated, validation.saveInventory, inventoryController.updateItem);
router.delete('/:id', isAuthenticated, inventoryController.deleteItem);

module.exports = router;