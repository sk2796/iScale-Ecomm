/**
 * In-memory data store for the grocery application.
 * Manages products, cart, and orders state.
 */
const seedProducts = require("../data/products");

const store = {
  products: [...seedProducts],
  cart: [],      // Array of { productId, quantity }
  orders: [],    // Array of order objects

  // ── Product Methods ──

  getAllProducts() {
    return this.products;
  },

  getProductsByCategory(category) {
    return this.products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  },

  getProductById(id) {
    return this.products.find((p) => p.id === id) || null;
  },

  searchProducts(query) {
    const q = query.toLowerCase();
    return this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  },

  // ── Cart Methods ──

  getCart() {
    return this.cart.map((item) => {
      const product = this.getProductById(item.productId);
      return {
        ...item,
        product,
        subtotal: product ? product.price * item.quantity : 0
      };
    });
  },

  getCartTotal() {
    return this.getCart().reduce((sum, item) => sum + item.subtotal, 0);
  },

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  addToCart(productId, quantity = 1) {
    const product = this.getProductById(productId);
    if (!product) return { error: "Product not found" };
    if (!product.inStock) return { error: "Product is out of stock" };

    const existing = this.cart.find((item) => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ productId, quantity });
    }
    return { success: true, cart: this.getCart() };
  },

  updateCartItem(productId, quantity) {
    const index = this.cart.findIndex((item) => item.productId === productId);
    if (index === -1) return { error: "Item not in cart" };

    if (quantity <= 0) {
      this.cart.splice(index, 1);
    } else {
      this.cart[index].quantity = quantity;
    }
    return { success: true, cart: this.getCart() };
  },

  removeFromCart(productId) {
    const index = this.cart.findIndex((item) => item.productId === productId);
    if (index === -1) return { error: "Item not in cart" };
    this.cart.splice(index, 1);
    return { success: true, cart: this.getCart() };
  },

  clearCart() {
    this.cart = [];
    return { success: true };
  },

  // ── Order Methods ──

  createOrder(customerInfo) {
    const cartItems = this.getCart();
    if (cartItems.length === 0) return { error: "Cart is empty" };

    const { v4: uuidv4 } = require("uuid");
    const order = {
      id: uuidv4(),
      items: cartItems.map((item) => ({
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        unit: item.product.unit,
        emoji: item.product.emoji,
        subtotal: item.subtotal
      })),
      total: this.getCartTotal(),
      customerName: customerInfo.customerName,
      address: customerInfo.address,
      phone: customerInfo.phone,
      status: "confirmed",
      createdAt: new Date().toISOString()
    };

    this.orders.push(order);
    this.clearCart();
    return { success: true, order };
  },

  getAllOrders() {
    return this.orders.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },

  getOrderById(id) {
    return this.orders.find((o) => o.id === id) || null;
  }
};

module.exports = store;
