/**
 * Order Routes
 * POST /api/orders      — Place a new order
 * GET  /api/orders      — List all orders
 * GET  /api/orders/:id  — Get specific order
 */
const express = require("express");
const router = express.Router();
const store = require("../store/store");

// Place order
router.post("/", (req, res) => {
  const { customerName, address, phone } = req.body;

  if (!customerName || !address || !phone) {
    return res.status(400).json({
      success: false,
      error: "customerName, address, and phone are required"
    });
  }

  const result = store.createOrder({ customerName, address, phone });
  if (result.error) {
    return res.status(400).json({ success: false, error: result.error });
  }

  res.status(201).json({
    success: true,
    data: result.order
  });
});

// List all orders
router.get("/", (req, res) => {
  const orders = store.getAllOrders();
  res.json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// Get single order
router.get("/:id", (req, res) => {
  const order = store.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, error: "Order not found" });
  }
  res.json({ success: true, data: order });
});

module.exports = router;
