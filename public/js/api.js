/**
 * API Client — Handles all HTTP communication with the backend.
 */
const API = {
  BASE: "/api",

  async request(endpoint, options = {}) {
    try {
      const res = await fetch(`${this.BASE}${endpoint}`, {
        headers: { "Content-Type": "application/json" },
        ...options
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      return data;
    } catch (err) {
      console.error(`API Error [${endpoint}]:`, err);
      throw err;
    }
  },

  // ── Products ──
  getProducts(category = "all", search = "") {
    let query = "";
    if (search) query = `?search=${encodeURIComponent(search)}`;
    else if (category && category !== "all") query = `?category=${encodeURIComponent(category)}`;
    return this.request(`/products${query}`);
  },

  getProduct(id) {
    return this.request(`/products/${id}`);
  },

  // ── Cart ──
  getCart() {
    return this.request("/cart");
  },

  addToCart(productId, quantity = 1) {
    return this.request("/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity })
    });
  },

  updateCartItem(productId, quantity) {
    return this.request(`/cart/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity })
    });
  },

  removeFromCart(productId) {
    return this.request(`/cart/${productId}`, { method: "DELETE" });
  },

  clearCart() {
    return this.request("/cart", { method: "DELETE" });
  },

  // ── Orders ──
  placeOrder(customerInfo) {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify(customerInfo)
    });
  },

  getOrders() {
    return this.request("/orders");
  },

  getOrder(id) {
    return this.request(`/orders/${id}`);
  }
};
