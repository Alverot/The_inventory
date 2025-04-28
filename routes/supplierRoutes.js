const express = require('express');
const supplierRouter = express.Router();
const supplierController = require("../controllers/supplierController");

supplierRouter.post('/',supplierController.createSupplier);



module.exports = supplierRouter;


// POST /api/suppliers
// GET /api/suppliers
// GET /api/suppliers/{id}
// PATCH /api/suppliers/{id}
// PUT /api/suppliers/{id}