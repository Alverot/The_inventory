const express = require('express');
const cors = require('cors');
const warehouseRoutes = require("./routes/warehouseRoutes");


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/warehouses", warehouseRoutes);


module.exports = app;
