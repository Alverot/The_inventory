const mongoose = require('mongoose');

const prosuctSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true },
    warehouseId:{type: String, required: true},// a way to identify the warehouse to which it belongs
    name: {type: String, required: true},
    sku: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number,required: true},
    category: {type: String, required: true},
    stockQuantity: {type: Number,required: true},

},{versionKey: false});

module.exports = mongoose.model('Product', prosuctSchema);

//Example:

// {
//     "id": "3f2ca143-d709-4741-9c44-cdf8a2cda70a",
//     "name": "Wireless Mouse",
//     "sku": "WM-1001",
//     "description": "Ergonomic wireless mouse with Bluetooth support",
//     "price": 29.99,
//     "category": "Electronics",
//     "stockQuantity": 100
//   }