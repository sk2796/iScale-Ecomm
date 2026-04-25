/**
 * Product Routes
 * GET /api/products       — List all products (optional ?category=X&search=Q)
 * GET /api/products/:id   — Get single product by ID
 */
const express = require("express");
const router = express.Router();
const store = require("../store/store");

// List products with optional category filter and search
router.get("/", (req, res) => {
  const { category, search } = req.query;

  let products;
  if (search) {
    products = store.searchProducts(search);
  } else if (category && category !== "all") {
    products = store.getProductsByCategory(category);
  } else {
    products = store.getAllProducts();
  }

  res.json({
    success: true,
    count: products.length,
    data: products
  });
});

// Get single product
router.get("/:id", (req, res) => {
  const product = store.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: "Product not found" });
  }
  res.json({ success: true, data: product });
});

module.exports = router;
