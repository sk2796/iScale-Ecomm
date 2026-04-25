/**
 * Cart Routes
 * GET    /api/cart              — Get cart contents
 * POST   /api/cart              — Add item to cart
 * PUT    /api/cart/:productId   — Update item quantity
 * DELETE /api/cart/:productId   — Remove item from cart
 * DELETE /api/cart              — Clear entire cart
 */
const express = require("express");
const router = express.Router();
const store = require("../store/store");

// Get cart
router.get("/", (req, res) => {
  const cart = store.getCart();
  res.json({
    success: true,
    data: cart,
    total: store.getCartTotal(),
    count: store.getCartCount()
  });
});

// Add to cart
router.post("/", (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId) {
    return res.status(400).json({ success: false, error: "productId is required" });
  }
  const result = store.addToCart(productId, quantity || 1);
  if (result.error) {
    return res.status(400).json({ success: false, error: result.error });
  }
  res.json({
    success: true,
    data: result.cart,
    total: store.getCartTotal(),
    count: store.getCartCount()
  });
});

// Update cart item quantity
router.put("/:productId", (req, res) => {
  const { quantity } = req.body;
  if (quantity === undefined) {
    return res.status(400).json({ success: false, error: "quantity is required" });
  }
  const result = store.updateCartItem(req.params.productId, quantity);
  if (result.error) {
    return res.status(400).json({ success: false, error: result.error });
  }
  res.json({
    success: true,
    data: result.cart,
    total: store.getCartTotal(),
    count: store.getCartCount()
  });
});

// Remove item from cart
router.delete("/:productId", (req, res) => {
  const result = store.removeFromCart(req.params.productId);
  if (result.error) {
    return res.status(404).json({ success: false, error: result.error });
  }
  res.json({
    success: true,
    data: result.cart,
    total: store.getCartTotal(),
    count: store.getCartCount()
  });
});

// Clear cart
router.delete("/", (req, res) => {
  store.clearCart();
  res.json({
    success: true,
    data: [],
    total: 0,
    count: 0
  });
});

module.exports = router;
