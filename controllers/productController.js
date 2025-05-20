const { json } = require('express');
const { v4: uuidv4 } = require('uuid');
const Product = require('../models/Product');
const Warehouse = require('../models/Warehouse');
const e = require('cors');


exports.createProduct = async (req, res) => {
    try {
        const { warehouseId } = req.params;
        const warehouse = await Warehouse.findOne({ id: warehouseId });
        if (!warehouse)      //check if the warehouse id is a valid one
        {
            return res.status(404).json({
                error: "Warehouse not found"
            });
        }

        const { name, sku, description, price, category, stockQuantity } = req.body;
        let newId = uuidv4();   //Used for generating unique id

        const product = new Product({ id: newId, warehouseId, name, sku, description, price, category, stockQuantity })
        await product.save();

        res.status(200).json({
            "id": product.id,
            "message": "Product created successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const { warehouseId } = req.params;
        const warehouse = await Warehouse.findOne({ id: warehouseId });
        if (!warehouse)      //check if the warehouse id is a valid one
        {
            return res.status(404).json({
                error: "Warehouse not found"
            });
        }
        const products = await Product.find({ warehouseId }).select('-_id -warehouseId -description -category');

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const { warehouseId, id } = req.params;
        const warehouse = await Warehouse.findOne({ id: warehouseId });
        if (!warehouse)      //check if the warehouse id is a valid one
        {
            return res.status(404).json({
                error: "Warehouse not found"
            });
        }

        const product = await Product.findOne({ id, warehouseId }).select('-_id -warehouseId');
        if (!product) {   // check if the product is not null (it exist in the warehouse)
            return res.status(404).json({
                error: "Product not found in this warehouse"
            });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { warehouseId, id } = req.params;
        const product = await Product.findOne({ id, warehouseId });
        if (!product) {   // check if the product is not null (it exist in the warehouse)
            return res.status(404).json({
                error: "Product not found in this warehouse"
            });
        }
        if ('stockQuantity' in req.body || 'id' in req.body) {
            return res.status(400).json({
                error: "Stock quantity should not be update via this endpoint"
            });
        }

        const productupdate = await Product.findOneAndUpdate({ warehouseId, id }, req.body)
        res.status(200).json({
            "message": "Product updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.replaceProduct = async (req, res) => {
    try {

        const { warehouseId, id } = req.params;
        const { name, sku, description, price, category, stockQuantity } = req.body;

        const product = await Product.findOne({ id, warehouseId });
        if (!product) {   // check if the product is null and creates one if it is
            const warehouse = await Warehouse.findOne({ id: warehouseId });
            if (!warehouse)      //check if the warehouse id is a valid one
            {
                return res.status(404).json({
                    error: "Warehouse not found"
                });
            }
            let newId = uuidv4();   //Used for generating unique id
            const product = new Product({ id: newId, warehouseId, name, sku, description, price, category, stockQuantity })
            await product.save();

            return res.status(200).json({
                "id": product.id,
                "message": "Product created successfully",
            });

        }
        else {
            const productupdate = await Product.findOneAndReplace({ warehouseId, id }, {
                id, warehouseId, name, sku, description, price, category, stockQuantity: product.stockQuantity 
            })
            res.status(200).json({
                "message": "Product updated successfully",
            });
        }

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {

        const { warehouseId, id } = req.params;
        const warehouse = await Warehouse.findOne({ id: warehouseId });
        if (!warehouse)      //check if the warehouse id is a valid one
        {
            return res.status(404).json({
                error: "Warehouse not found"
            });
        }

        const deleteResult = await Product.deleteOne({ id, warehouseId });
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({
                error: "Product not found in this warehouse"
            });
        }

        res.status(200).json({
            "message": "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};





