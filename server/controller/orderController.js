import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

export const createOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const user = req.user._id;

  if (orderItems && orderItems.length === 0) throw new Error("No order items");
  const order = await Order.create({
    orderItems,
    user,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  });
  res.status(201).json({
    status: "success",
    order,
  });
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "name _id");

  res.status(200).json({
    status: "success",
    results: orders.length,
    orders,
  });
});
export const deleteAllOrders = asyncHandler(async (req, res) => {
  await Order.deleteMany();

  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const getOrder = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id).populate("user", "name email");

  if (!order) throw new Error("No order found");

  res.status(200).json({
    status: "success",
    order,
  });
});

//PUT /api/orders/:id/pay
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);

  if (!order) throw new Error("No order found");
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  };
  const updatedOrder = await order.save();

  res.status(200).json({
    status: "success",
    updatedOrder,
  });
});
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);

  if (!order) throw new Error("No order found");
  order.isDelivered = true;
  order.deliveredAt = Date.now();
  const updatedOrder = await order.save();

  res.status(200).json({
    status: "success",
    updatedOrder,
  });
});

// api/orders/myorders
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    status: "success",
    orders,
  });
});
