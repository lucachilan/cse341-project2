const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=[Inventory]
    try {
        const result = await mongodb.getDatabase().db().collection('inventory').find();
        result.toArray().then((inventory) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(inventory);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving inventory.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=[Inventory]
    try {
        const itemId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('inventory').find({ _id: itemId });
        result.toArray().then((inventory) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(inventory[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving the item.' });
    }
};

const deleteItem = async (req, res) => {
    //#swagger.tags=[Inventory]
    try {
        const itemId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('inventory').deleteOne({ _id: itemId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Something went wrong deleting the item');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the item.' });
    }
}

const createItem = async (req, res) => {
    //#swagger.tags=[Inventory]
    try {
        const item = {
            itemCode: req.body.itemCode,
            itemName: req.body.itemName,
            purchaseDate: req.body.purchaseDate,
            purchasePrice: req.body.purchasePrice,
            currentStatus: req.body.currentStatus,
            category: req.body.category,
            lastServiceDate: req.body.lastServiceDate
        }

        const response = await mongodb.getDatabase().db().collection('inventory').insertOne(item);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "We couldn't create this item");
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the item.' });
    }
}

const updateItem = async (req, res) => {
    //#swagger.tags=[Inventory]
    try {
        const itemId = new ObjectId(req.params.id);
        const item = {
            itemCode: req.body.itemCode,
            itemName: req.body.itemName,
            purchaseDate: req.body.purchaseDate,
            purchasePrice: req.body.purchasePrice,
            currentStatus: req.body.currentStatus,
            category: req.body.category,
            lastServiceDate: req.body.lastServiceDate
        }
        const response = await mongodb.getDatabase().db().collection('inventory').replaceOne({ _id: itemId }, item);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "We couldn't update this item");
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the item.' });
    }
}


module.exports = {
    getAll,
    getSingle,
    deleteItem,
    updateItem,
    createItem
}