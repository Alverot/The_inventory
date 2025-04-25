const { json } = require('express');
const Warehouse = require('../models/Warehouse');

exports.createWarehouse = async (req, res) => {
    try{
        const {name, location} = req.body;

        const lastWerhowse = await Warehouse.findOne().sort({$natural: -1}).exec();
        let newId = "W1";
        
        if(lastWerhowse && lastWerhowse.id){
            const lastIdNumber = parseInt(lastWerhowse.id.substring(1));
            newId = `W${lastIdNumber + 1}`;
        }
        const warehouse = new Warehouse({id: newId, name, location})
        await warehouse.save();
        res.status(200).send({
            "message": "Warehouse created successfully",
            "id": warehouse.id,
          });
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

exports.getAllWarehouses = async (req, res) =>{
    try{
        
        const warehouses = await Warehouse.find().select('-_id');
        res.json(warehouses);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

exports.getWarehouse = async( req, res) =>{
    try
    {
        const { id } = req.params;
        console.log(id);
        const warehouse = await Warehouse.findOne({ id }).select('-_id');

        if(!warehouse){
            return res.status(404).json({ error: "Warehouse not found"});
        }
        res.json(warehouse);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};