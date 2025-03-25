
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;


// app.get()
// app.post()
// app.put()
// app.delete()

app.use(express.json());

const warehouseRoutes = require("./routes/warehouseRoutes");
app.use("/api/warehouses", warehouseRoutes);

/*
app.get('/',(req,res) =>{
    res.send('Hello World!?');
})

app.get('/api/test',(req,res) => {
    res.send([1,2,3]);
})

app.get('/api/test/:id/:number', (req,res) =>{
    res.send(req.params);
})
*/


app.listen(port, () => console.log(`listening on port ${port}`));
