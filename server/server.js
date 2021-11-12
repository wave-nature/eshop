const express = require("express");
const products = require("./data/products");

const app = express();

app.get("/api/products", (req, res) => {
  res.status(200).json({
    products,
  });
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.status(200).json({
    product,
  });
});

const PORT = 7000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
