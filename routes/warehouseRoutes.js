const express = require('express');
const warehouseRouter = express.Router();
const warehouseController = require("../controllers/warehouseController");


warehouseRouter.post('/',warehouseController.createWarehouse);//creates a new warehouse with the last id + 1
warehouseRouter.get('/',warehouseController.getAllWarehouses);// returns all of the warehouses
warehouseRouter.get('/:id',warehouseController.getWarehouse);// returns a specific warehouse based on the id
warehouseRouter.patch('/:id',warehouseController.updateWarehouse);// updates a single field
warehouseRouter.put('/:id',warehouseController.replaceWarehouse);//updates all of the body

module.exports = warehouseRouter;


// POST /api/warehouses
// GET /api/warehouses
// GET /api/warehouses/{id}
// PATCH /api/warehouses/{id}
// PUT /api/warehouses/{id}