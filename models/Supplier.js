const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    id: {type: String, require: true},
    name: {type: String, require: true},
    contactEmail: {type: String, require: true},
},{versionKey: false});

module.exports = mongoose.model('Supplier', supplierSchema);