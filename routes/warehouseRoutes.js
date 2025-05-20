const express = require('express');
const warehouseRouter = express.Router();
const warehouseController = require("../controllers/warehouseController");
const productController = require("../controllers/productController");

//Warehouse routes

warehouseRouter.post('/',warehouseController.createWarehouse);//creates a new warehouse with the last id + 1
warehouseRouter.get('/',warehouseController.getAllWarehouses);// returns all of the warehouses
warehouseRouter.get('/:id',warehouseController.getWarehouse);// returns a specific warehouse based on the id
warehouseRouter.patch('/:id',warehouseController.updateWarehouse);// updates a single field
warehouseRouter.put('/:id',warehouseController.replaceWarehouse);//updates all of the body

//Product routes

warehouseRouter.post('/:warehouseId/products',productController.createProduct);
warehouseRouter.get('/:warehouseId/products',productController.getAllProducts);
warehouseRouter.get('/:warehouseId/products/:id',productController.getProduct);
warehouseRouter.patch('/:warehouseId/products/:id',productController.updateProduct);
warehouseRouter.put('/:warehouseId/products/:id',productController.replaceProduct);
warehouseRouter.delete('/:warehouseId/products/:id',productController.deleteProduct);


module.exports = warehouseRouter;


//Warehouse routes

// POST /api/warehouses
// GET /api/warehouses
// GET /api/warehouses/{id}
// PATCH /api/warehouses/{id}
// PUT /api/warehouses/{id}


//Product Management

// POST /api/warehouses/{warehouseId}/products
// GET /api/warehouses/{warehouseId}/products
// GET /api/warehouses/{warehouseId}/products/{id}
// PATCH /api/warehouses/{warehouseId}/products/{id}
// PUT /api/warehouses/{warehouseId}/products/{id}
// DELETE /api/warehouses/{warehouseId}/products/{id}


//Stock Management

// GET /api/warehouses/{warehouseId}/inventory
// GET /api/warehouses/{warehouseId}/inventory/{productId}
// POST /api/warehouses/{warehouseId}/inventory/{productId}/increase
// POST /api/warehouses/{warehouseId}/inventory/{productId}/decrease
// POST /api/warehouses/{warehouseId}/inventory/{productId}/transfer