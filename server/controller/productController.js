import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc Fetch all products
// @route GET /api/products
// @access Public

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    products,
  });
});

// @desc Fetch a products
// @route GET /api/products/:id
// @access Public

export const getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const product = await Product.findById(id);
  if (product) {
    res.status(200).json({
      status: "success",
      product,
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
