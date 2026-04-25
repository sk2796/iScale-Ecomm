/**
 * Order Confirmation Page — Shows order success and details.
 */
const OrderConfirmPage = {
  async render(params = {}) {
    const app = document.getElementById("app");
    Navbar.render("");

    if (params.orderId) {
      // Show specific order confirmation
      app.innerHTML = `<div class="loading-container"><div class="loader"></div></div>`;

      try {
        const res = await API.getOrder(params.orderId);
        const order = res.data;

        app.innerHTML = `
          <div class="order-success">
            <div class="order-success-icon">✅</div>
            <h1>Order Placed!</h1>
            <p>Your groceries are on their way. Here's your order summary.</p>
            ${OrderCard.render(order)}
            <div class="order-actions">
              <button class="btn-primary" onclick="App.navigate('home')">
                🛍️ Continue Shopping
              </button>
              <button class="btn-secondary" onclick="App.navigate('orders')">
                📋 View All Orders
              </button>
            </div>
          </div>
        `;
      } catch (err) {
        app.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-emoji">⚠️</div>
            <h2>Order not found</h2>
            <p>We couldn't find this order.</p>
            <button class="btn-primary" onclick="App.navigate('home')">Go Home</button>
          </div>
        `;
      }
    } else {
      // Show all orders
      await this.renderOrdersList(app);
    }
  },

  async renderOrdersList(app) {
    Navbar.render("orders");
    app.innerHTML = `
      <div class="page-header">
        <h1>📋 Your Orders</h1>
        <p>Track and review your past orders</p>
      </div>
      <div id="orders-content">
        <div class="loading-container"><div class="loader"></div></div>
      </div>
    `;

    try {
      const res = await API.getOrders();
      const container = document.getElementById("orders-content");

      if (!res.data || res.data.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-emoji">📋</div>
            <h2>No orders yet</h2>
            <p>Your order history will appear here.</p>
            <button class="btn-primary" onclick="App.navigate('home')">
              🛍️ Start Shopping
            </button>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div style="animation: fadeIn 0.5s ease;">
          ${res.data.map(order => OrderCard.render(order)).join('')}
        </div>
      `;
    } catch (err) {
      const container = document.getElementById("orders-content");
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-emoji">⚠️</div>
          <h2>Failed to load orders</h2>
          <p>${err.message}</p>
        </div>
      `;
    }
  }
};
