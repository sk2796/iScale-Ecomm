/**
 * iScale Grocery — Express Server
 * Serves the API and static frontend
 */
const express = require("express");
const cors = require("cors");
const path = require("path");

const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──
app.use(cors());
app.use(express.json());

// ── Static Files ──
app.use(express.static(path.join(__dirname, "..", "public")));

// ── API Routes ──
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ── SPA Fallback ──
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// ── Start Server ──
app.listen(PORT, () => {
  console.log(`\n  🥬 iScale Grocery Server`);
  console.log(`  ────────────────────────`);
  console.log(`  ✅ Running at http://localhost:${PORT}`);
  console.log(`  📦 API:       http://localhost:${PORT}/api/products`);
  console.log(`  🛒 Cart API:  http://localhost:${PORT}/api/cart`);
  console.log(`  📋 Orders:    http://localhost:${PORT}/api/orders\n`);
});
