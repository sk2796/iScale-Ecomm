/**
 * Checkout Page — Order form with delivery details and order summary.
 */
const CheckoutPage = {
  async render() {
    const app = document.getElementById("app");
    Navbar.render("cart");

    app.innerHTML = `
      <div class="page-header">
        <h1>📦 Checkout</h1>
        <p>Fill in your delivery details to complete the order</p>
      </div>
      <div id="checkout-content">
        <div class="loading-container"><div class="loader"></div></div>
      </div>
    `;

    await this.loadCheckout();
  },

  async loadCheckout() {
    const container = document.getElementById("checkout-content");

    try {
      const res = await API.getCart();
      const items = res.data;
      const total = res.total;

      if (!items || items.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-emoji">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add items before checking out.</p>
            <button class="btn-primary" onclick="App.navigate('home')">
              🛍️ Browse Products
            </button>
          </div>
        `;
        return;
      }

      const delivery = total >= 500 ? 0 : 40;
      const grandTotal = total + delivery;

      container.innerHTML = `
        <div class="checkout-layout">
          <div class="checkout-form">
            <h2>🚚 Delivery Details</h2>
            <form id="checkout-form" onsubmit="CheckoutPage.placeOrder(event)">
              <div class="form-group">
                <label class="form-label" for="customer-name">Full Name</label>
                <input
                  type="text"
                  class="form-input"
                  id="customer-name"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="customer-phone">Phone Number</label>
                <input
                  type="tel"
                  class="form-input"
                  id="customer-phone"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="customer-address">Delivery Address</label>
                <textarea
                  class="form-input"
                  id="customer-address"
                  placeholder="Enter your complete delivery address"
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn-place-order" id="btn-place-order">
                ✅ Place Order — ₹${grandTotal}
              </button>
            </form>
          </div>
          <div class="checkout-order-summary">
            <h2>🧾 Order Summary</h2>
            ${items.map(item => `
              <div class="checkout-item">
                <span class="checkout-item-emoji">${item.product.emoji}</span>
                <div class="checkout-item-details">
                  <div class="checkout-item-name">${item.product.name}</div>
                  <div class="checkout-item-qty">${item.quantity} × ₹${item.product.price}</div>
                </div>
                <div class="checkout-item-price">₹${item.subtotal}</div>
              </div>
            `).join('')}
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--surface-border);">
              <div class="summary-row">
                <span class="label">Subtotal</span>
                <span class="value">₹${total}</span>
              </div>
              <div class="summary-row">
                <span class="label">Delivery</span>
                <span class="value">${delivery === 0 ? '<span style="color: var(--success)">FREE</span>' : `₹${delivery}`}</span>
              </div>
              <div class="summary-row total">
                <span class="label">Total</span>
                <span class="value">₹${grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } catch (err) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-emoji">⚠️</div>
          <h2>Something went wrong</h2>
          <p>${err.message}</p>
        </div>
      `;
    }
  },

  async placeOrder(e) {
    e.preventDefault();

    const btn = document.getElementById("btn-place-order");
    btn.disabled = true;
    btn.textContent = "Placing order...";

    const customerName = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    try {
      const res = await API.placeOrder({ customerName, address, phone });
      Navbar.updateCartCount();
      App.navigate("order-confirm", { orderId: res.data.id });
    } catch (err) {
      btn.disabled = false;
      btn.textContent = "✅ Place Order";
      App.showToast(err.message || "Failed to place order", "error");
    }
  }
};
