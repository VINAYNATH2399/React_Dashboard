const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const User = require('./MOdels/User');
const Product = require("./MOdels/Product")
const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/ecom-dashboard') //returns a promise
  .then(() => { console.log("Vinay DB connected") })
  .catch((err) => { console.log("Error is: ", err) })

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password
  res.send(result)
})

app.post("/login", async (req, res) => {

  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");

    if (user) {
      res.send(user)
    }
    else {
      res.send({ result: "No User found" })
    }
  }
  else {
    res.send({ result: "No User found" })
  }
})

app.post("/add-product", async (req, res) => {

  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
})

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products)
  }
  else {
    res.send({ result: "No product found" })
  }
})

app.delete("/product/:id", async (req, res) => {
  // res.send(req.params.id);
  const result = await Product.deleteOne({ _id: req.params.id })
  res.send(result)
})

app.get("/product/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  }
  else {
    res.send({ "result ": "No result found" })
  }
})

app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body
    }
  )
  res.send(result)
})

app.get('/search/:key', async (req, res) => {
  let result = await Product.find({
    //jab bhi hme ek field me jada search karte hai hm $or
    "$or": [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } }

    ]
  })
  res.send(result)
})

const port = 3000; // Change the port number as needed
app.listen(port, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log(`Server is listening on port ${port}`);
});
