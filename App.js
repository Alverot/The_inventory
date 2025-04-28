const express = require('express');
const cors = require('cors');
const warehouseRoutes = require("./routes/warehouseRoutes");
const supplierRoutes = require("./routes/supplierRoutes");


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/warehouses", warehouseRoutes);
app.use("/api/suppliers", supplierRoutes);


module.exports = app;
