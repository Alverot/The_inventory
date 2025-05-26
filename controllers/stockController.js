const { json } = require('express');
const { v4: uuidv4 } = require('uuid');
const Product = require('../models/Product');
const Warehouse = require('../models/Warehouse');
const StockLog = require('../models/StockLog');


exports.getAllInventory = async (req, res) => {
    try {
        const { warehouseId } = req.params;
        const warehouse = await Warehouse.findOne({ id: warehouseId });
        if (!warehouse)      //check if the warehouse id is a valid one
        {
            return res.status(404).json({
                error: "Warehouse not found"
            });
        }
        const products = await Product.find({ warehouseId }).select('productId sku stockQuantity');

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getProductFromInventory = async (req, res) => {
    try {
        const { warehouseId, productId } = req.params;
        const warehouse = await Warehouse.findOne({ id: warehouseId });
        if (!warehouse)      //check if the warehouse id is a valid one
        {
            return res.status(404).json({
                error: "Warehouse not found"
            });
        }

        const product = await Product.findOne({ id: productId, warehouseId }).select('productId sku stockQuantity');
        if (!product) {   // check if the product is not null (it exist in the warehouse)
            return res.status(404).json({
                error: "Product not found in this warehouse"
            });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.increaseStock = async (req, res) => {
    try {
        const { warehouseId, productId } = req.params;
        const { quantity, supplierId } = req.body;
        const warehouse = await Warehouse.findOne({ id: warehouseId });
        if (!warehouse)      //check if the warehouse id is a valid one
        {
            return res.status(404).json({
                error: "Warehouse not found"
            });
        }
        const product = await Product.findOne({ id: productId, warehouseId });
        if (!product) {   // check if the product is not null (it exist in the warehouse)
            return res.status(404).json({
                error: "Product not found in this warehouse"
            });
        }

        product.stockQuantity += quantity; // increase quantity
        await product.save();

        //log transaction
        const log = new StockLog({
            id: uuidv4(),
            warehouseId,
            productId,
            type: 'increase',
            quantity,
            supplierId
        });
        await log.save();


        res.status(200).json({
            message: "Stock increased successfully",
            newStockQuantity: product.stockQuantity
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.decreaseStock = async (req, res) => {
    try {
        const { warehouseId, productId } = req.params;
        const { quantity, reason } = req.body;
        const warehouse = await Warehouse.findOne({ id: warehouseId });
        if (!warehouse)      //check if the warehouse id is a valid one
        {
            return res.status(404).json({
                error: "Warehouse not found"
            });
        }
        const product = await Product.findOne({ id: productId, warehouseId });
        if (!product) {   // check if the product is not null (it exist in the warehouse)
            return res.status(404).json({
                error: "Product not found in this warehouse"
            });
        }
        if (product.stockQuantity < quantity) {// verify if there is enaugh stock
            return res.status(400).json({
                error: "Insufficient stock"
            });
        }

        product.stockQuantity -= quantity; // decrease quantity
        await product.save();

        //log transaction
        const log = new StockLog({
            id: uuidv4(),
            warehouseId,
            productId,
            type: 'decrease',
            quantity,
            reason
        });
        await log.save();


        res.status(200).json({
            message: "Stock decreased successfully",
            newStockQuantity: product.stockQuantity
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.transferStock = async (req, res) => {
    try {
        const { warehouseId, productId } = req.params;
        const { quantity, targetWarehouseId, reason } = req.body;

        const warehouse = await Warehouse.findOne({ id: warehouseId });
        if (!warehouse)      //check if the warehouse id is a valid one
        {
            return res.status(404).json({
                error: "Warehouse not found"
            });
        }
        const product = await Product.findOne({ id: productId, warehouseId });
        if (!product) {   // check if the product is not null (it exist in the warehouse)
            return res.status(404).json({
                error: "Product not found in this warehouse"
            });
        }
        if (product.stockQuantity < quantity) {// verify if there is enaugh stock
            return res.status(400).json({
                error: "Insufficient stock"
            });
        }
        const Targetwarehouse = await Warehouse.findOne({ id: targetWarehouseId });
        if (!Targetwarehouse)      //check if the warehouse id is a valid one
        {
            return res.status(404).json({
                error: "Target warehouse not found"
            });
        }

        let TargetProduct = await Product.findOne({ id: productId, warehouseId: targetWarehouseId });        // creates a product with 0 stock if it does not exist in the target warehouse
        if (!TargetProduct) {
            TargetProduct = new Product({
                id: uuidv4(),
                warehouseId: targetWarehouseId,
                name: product.name,
                sku: product.sku,
                description: product.description,
                price: product.price,
                category: product.category,
                stockQuantity: 0
            });
        }
        product.stockQuantity -= quantity;
        TargetProduct.stockQuantity += quantity;
        await product.save();
        await TargetProduct.save();




        //log transaction
        const log = new StockLog({
            id: uuidv4(),
            warehouseId,
            productId,
            type: 'transfer',
            quantity,
            targetWarehouseId,
            reason
        });
        await log.save();


        res.status(200).json({
            message: "Stock transferred successfully",
            newStockQuantity: product.stockQuantity
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};