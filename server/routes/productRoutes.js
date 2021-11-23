import express from "express";
import {
  createProduct,
  createReview,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  topProducts,
} from "../controller/productController.js";
import { proctect, isAdmin } from "../controller/authController.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(proctect, isAdmin, createProduct);
router.get("/popular", topProducts);

router
  .route("/:id")
  .get(getProduct)
  .delete(proctect, isAdmin, deleteProduct)
  .put(proctect, isAdmin, updateProduct);
router.route("/:id/reviews").post(proctect, createReview);

export default router;
