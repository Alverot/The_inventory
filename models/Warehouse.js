const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    id: {type: String, required: true},
    name:{ type: String, required: true},
    location:{ type: String, required: true},

},{ versionKey: false});

module.exports = mongoose.model('Warehouse', warehouseSchema);