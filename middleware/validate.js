const { body, validationResult } = require('express-validator');

const saveInventory = [
    body('itemCode').isString().withMessage('itemCode must be a string'),
    body('itemName').isString().withMessage('itemName must be a string'),
    body('purchaseDate').isDate().withMessage('purchaseDate must be a valid date'),
    body('purchasePrice').isNumeric().withMessage('purchasePrice must be a number'),
    body('currentStatus').isString().withMessage('currentStatus must be a string'),
    body('category').isString().withMessage('category must be a string'),
    body('lastServiceDate').isDate().withMessage('lastServiceDate must be a valid date'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: errors.array()
            });
        }
        next();
    }
];

const saveMaintenance = [
    body('equipmentId').isString().withMessage('equipmentId must be a string'),
    body('serviceType').isString().withMessage('serviceType must be a  string'),
    body('cost').isNumeric().withMessage(' cost must be numeric'),
    body('technicianName').isString().withMessage('technicianName must be a  string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: errors.array()
            });
        }
        next();
    }
];

module.exports = {
    saveInventory,
    saveMaintenance
};
