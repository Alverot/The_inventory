const Warehouse = require('../models/Warehouse');

exports.createWarehouse = async (req, res) => {
    try{
        const warehouse = new Warehouse(req.body);
        await warehouse.save();
        res.status(201).send(warehouse);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};