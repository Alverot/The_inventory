const express = require('express');
const supplierRouter = express.Router();
const supplierController = require("../controllers/supplierController");


supplierRouter.post('/',supplierController.createSupplier);
supplierRouter.get('/',supplierController.getAllSuppliers);
supplierRouter.get('/:id',supplierController.getSupplier);
supplierRouter.patch('/:id',supplierController.updateSupplier);
supplierRouter.put('/:id',supplierController.replaceSupplier);

module.exports = supplierRouter;


// POST /api/suppliers
// GET /api/suppliers
// GET /api/suppliers/{id}
// PATCH /api/suppliers/{id}
// PUT /api/suppliers/{id}