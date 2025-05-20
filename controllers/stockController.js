const { json } = require('express');



exports.getAllInventory = async (req, res) => {
    try {
        res.status(200).json({
            "id": product.id,
            "message": "WORK IN PROGRESS",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getProductFromInventory = async (req, res) => {
    try {
        res.status(200).json({
            "id": product.id,
            "message": "WORK IN PROGRESS",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.increaseStock = async (req, res) => {
    try {
        res.status(200).json({
            "id": product.id,
            "message": "WORK IN PROGRESS",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.decreaseStock = async (req, res) => {
    try {
        res.status(200).json({
            "id": product.id,
            "message": "WORK IN PROGRESS",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.transferStock = async (req, res) => {
    try {
        res.status(200).json({
            "id": product.id,
            "message": "WORK IN PROGRESS",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};