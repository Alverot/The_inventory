const express = require('express');
const warehouseRouter = express.Router();
const warehouseController = require("../controllers/warehouseController");


warehouseRouter.post('/',warehouseController.createWarehouse);
warehouseRouter.get('/',warehouseController.getAllWarehouses);
warehouseRouter.get('/:id',warehouseController.getWarehouse);


// router.patch('/:id',warehouseController.updateWarehouse);
// router.put('/:id',warehouseController.updateWarehouse);

module.exports = warehouseRouter;



// POST /api/warehouses
// GET /api/warehouses
// GET /api/warehouses/{id}
// PATCH /api/warehouses/{id}
// PUT /api/warehouses/{id}