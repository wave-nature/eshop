import express from "express";
import {
  createOrderItems,
  getOrder,
  getAllOrders,
  updateOrderToPaid,
  getMyOrders,
  deleteAllOrders,
  updateOrderToDelivered,
} from "../controller/orderController.js";
import { isAdmin, proctect } from "../controller/authController.js";

const router = express.Router();

router
  .route("/")
  .post(proctect, createOrderItems)
  .get(proctect, isAdmin, getAllOrders)
  .delete(proctect, isAdmin, deleteAllOrders);
router.route("/myorders").get(proctect, getMyOrders);
router.route("/:id").get(proctect, getOrder);
router.route("/:id/pay").put(proctect, updateOrderToPaid);
router.route("/:id/deliver").put(proctect, isAdmin, updateOrderToDelivered);
export default router;
