import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({
    name: "Default Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "brand",
    category: "category",
    countInStock: 0,
    numReviews: 0,
    description: "description",
  });
  res.status(201).json({
    status: "success",
    product,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image || "/images/sample.jpg";
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;

  const updatedProduct = await product.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    updatedProduct,
  });
});

// /api/products/:id/reviews
export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Already reviewed");
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(201).json({ message: "review added" });
});

// @desc Fetch all products
// @route GET /api/products
// @access Public

export const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = req.query.pageNumber || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200).json({
    results: products.length,
    status: "success",
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

export const topProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort("-rating").limit(3);

  res.status(200).json({
    results: products.length,
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

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("No product found with this id");
  }

  res.status(204).json({
    status: "success",
  });
});
// export const getProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (!product) {
//     res.status(404);
//     throw new Error("No product found with this id");
//   }
//   res.status(200).json({
//     status: "success",
//     product,
//   });
// });
