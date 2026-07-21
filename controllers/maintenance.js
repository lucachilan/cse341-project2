const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=[maintenance]
    try {
        const result = await mongodb.getDatabase().db().collection('maintenance').find();
        result.toArray().then((maintenance) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(maintenance);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving maintenance record.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=[maintenance]
    try {
        const maintenanceId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('maintenance').find({ _id: maintenanceId });
        result.toArray().then((maintenance) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(maintenance[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving the maintenance record.' });
    }
};

const deleteMaintenance = async (req, res) => {
    //#swagger.tags=[maintenance]
    try {
        const maintenanceId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('maintenance').deleteOne({ _id: maintenanceId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Something went wrong deleting the maintenance record');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the maintenance record.' });
    }
}

const createMaintenance = async (req, res) => {
    //#swagger.tags=[maintenance]
    try {
        const maintenance = {
            equipmentId:req.body.equipmentId,
            serviceType:req.body.serviceType,
            cost:req.body.cost,
            technicianName:req.body.technicianName
        }

        const response = await mongodb.getDatabase().db().collection('maintenance').insertOne(maintenance);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "We couldn't create this Maintenance");
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the Maintenance.' });
    }
}

const updateMaintenance = async (req, res) => {
    //#swagger.tags=[maintenance]
    try {
        const maintenanceId = new ObjectId(req.params.id);
        const maintenance = {
            equipmentId:req.body.equipmentId,
            serviceType:req.body.serviceType,
            cost:req.body.cost,
            technicianName:req.body.technicianName
        }
        const response = await mongodb.getDatabase().db().collection('maintenance').replaceOne({ _id: maintenanceId }, maintenance);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "We couldn't update this Maintenance record");
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the Maintenance record.' });
    }
}

module.exports = {
    getAll,
    getSingle,
    deleteMaintenance,
    updateMaintenance,
    createMaintenance
}