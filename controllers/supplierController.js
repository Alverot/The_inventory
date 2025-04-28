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
        res.status(200).send({
            "message": "Supplier created successfully",
            "id": supplier.id,
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};