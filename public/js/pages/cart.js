/**
 * Cart Page — Displays cart items, quantity controls, and summary.
 */
const CartPage = {
  async render() {
    const app = document.getElementById("app");
    Navbar.render("cart");

    app.innerHTML = `
      <div class="page-header">
        <h1>🛒 Your Cart</h1>
        <p>Review your items and proceed to checkout</p>
      </div>
      <div id="cart-content">
        <div class="loading-container"><div class="loader"></div></div>
      </div>
    `;

    await this.loadCart();
  },

  async loadCart() {
    const container = document.getElementById("cart-content");

    try {
      const res = await API.getCart();
      const items = res.data;
      const total = res.total;
      const count = res.count;

      Navbar.cartCount = count;

      if (!items || items.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-emoji">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some delicious groceries to get started!</p>
            <button class="btn-primary" onclick="App.navigate('home')">
              🛍️ Start Shopping
            </button>
          </div>
        `;
        return;
      }

      const delivery = total >= 500 ? 0 : 40;
      const grandTotal = total + delivery;

      container.innerHTML = `
        <div class="cart-layout">
          <div class="cart-items-list">
            ${items.map(item => CartItem.render(item)).join('')}
          </div>
          <div class="cart-summary">
            <h2>Order Summary</h2>
            <div class="summary-row">
              <span class="label">Subtotal (${count} items)</span>
              <span class="value">₹${total}</span>
            </div>
            <div class="summary-row">
              <span class="label">Delivery</span>
              <span class="value">${delivery === 0 ? '<span style="color: var(--success)">FREE</span>' : `₹${delivery}`}</span>
            </div>
            ${delivery > 0 ? `
              <div class="summary-row">
                <span class="label" style="font-size:12px; color: var(--primary-light);">🎉 Free delivery on orders above ₹500</span>
              </div>
            ` : ''}
            <div class="summary-row total">
              <span class="label">Total</span>
              <span class="value">₹${grandTotal}</span>
            </div>
            <button class="btn-checkout" onclick="App.navigate('checkout')" id="btn-checkout">
              🛍️ Proceed to Checkout
            </button>
            <button class="btn-clear-cart" onclick="CartPage.clearCart()" id="btn-clear-cart">
              🗑️ Clear Cart
            </button>
          </div>
        </div>
      `;
    } catch (err) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-emoji">⚠️</div>
          <h2>Failed to load cart</h2>
          <p>${err.message}</p>
          <button class="btn-primary" onclick="CartPage.loadCart()">Retry</button>
        </div>
      `;
    }
  },

  async updateItem(productId, qty) {
    try {
      if (qty <= 0) {
        await API.removeFromCart(productId);
        App.showToast("Item removed", "success");
      } else {
        await API.updateCartItem(productId, qty);
      }
      await this.loadCart();
      Navbar.updateCartCount();
    } catch (err) {
      App.showToast(err.message, "error");
    }
  },

  async removeItem(productId) {
    try {
      await API.removeFromCart(productId);
      App.showToast("Item removed", "success");
      await this.loadCart();
      Navbar.updateCartCount();
    } catch (err) {
      App.showToast(err.message, "error");
    }
  },

  async clearCart() {
    try {
      await API.clearCart();
      App.showToast("Cart cleared", "success");
      await this.loadCart();
      Navbar.updateCartCount();
    } catch (err) {
      App.showToast(err.message, "error");
    }
  }
};
