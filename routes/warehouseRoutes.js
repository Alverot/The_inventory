const express = require('express');
const router = express.Router();
const warehouseController = require("../controllers/warehouseController");


router.post('/',warehouseController.createWarehouse);

// router.get('/',warehouseController.getAllWarehouses);
// router.get('/:id',warehouseController.getWarehouse);
// router.patch('/:id',warehouseController.updateWarehouse);
// router.put('/:id',warehouseController.updateWarehouse);

module.exports = router;



// POST /api/warehouses
// GET /api/warehouses
// GET /api/warehouses/{id}
// PATCH /api/warehouses/{id}
// PUT /api/warehouses/{id}