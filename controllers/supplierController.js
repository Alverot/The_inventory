const { json } = require('express');
const Supplier = require('../models/Supplier');

exports.createSupplier = async (req, res) => {
    try {

        const { name, contactEmail } = req.body;

        const lastSupplier = await Supplier.findOne().sort({ $natural: -1 }).exec();
        let newId = "S1";

        if (lastSupplier && lastSupplier.id) {
            const lastIdNumber = parseInt(lastSupplier.id.substring(1));
            newId = `S${lastIdNumber + 1}`;
        }
        const supplier = new Supplier({ id: newId, name, contactEmail })
        await supplier.save();
        res.status(200).json({
            "message": "Supplier created successfully",
            "id": supplier.id,
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find().select('-_id');
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const suppliers = await Supplier.findOne({ id }).select('-_id');
        if (!suppliers) {
            return res.status(404).json({ error: "Supplier not found" });
        }
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier1 = await Supplier.findOne({ id })
        if (!supplier1) {
            return res.status(404).json({ error: "Supplier not found" });
        }
        const supplier = await Supplier.findOneAndUpdate(supplier1, req.body, { new: true });//{ new: true } returns the updated version

        res.status(200).json({
            "message": "Supplier updated successfully",
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.replaceSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, contactEmail} = req.body;

        const supplier = await Supplier.findOne({id});

        if(!supplier){
                    return res.status(404).json({ error: "Supplier not found"});
        }
        const supplier1 = await Supplier.findOneAndReplace(supplier,{id, name, contactEmail});

        res.status(200).json({
            "message": "Supplier updated successfully",
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};