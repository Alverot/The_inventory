const mongoose = require('mongoose');

const stockLogSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true },
    warehouseId:{type: String, required: true},// a way to identify the warehouse where the change was made
    productId: { type: String, required: true }, // Product being updated
    type: { type: String, required: true, enum: ['increase', 'decrease', 'transfer'] }, // Type of operation
    quantity: { type: Number, required: true }, // Quantity of stock change
    supplierId: { type: String }, // Supplier if stock increase
    targetWarehouseId: { type: String },//just if transfer operation
    reason: { type: String },
    timestamp: { type: Date, default: Date.now }//date of the log
},{versionKey: false});

module.exports = mongoose.model('StockLog', stockLogSchema);
