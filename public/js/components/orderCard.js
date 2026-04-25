/**
 * OrderCard Component — Renders an order summary card.
 */
const OrderCard = {
  render(order) {
    const date = new Date(order.createdAt);
    const formattedDate = date.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-IN', {
      hour: '2-digit', minute: '2-digit'
    });

    return `
      <div class="order-detail-card">
        <h2>📦 Order #${order.id.slice(0, 8).toUpperCase()}</h2>
        <div class="order-meta">
          <div class="order-meta-item">
            <span class="order-meta-label">Date</span>
            <span class="order-meta-value">${formattedDate}, ${formattedTime}</span>
          </div>
          <div class="order-meta-item">
            <span class="order-meta-label">Status</span>
            <span class="order-meta-value" style="color: var(--success);">✓ ${order.status}</span>
          </div>
          <div class="order-meta-item">
            <span class="order-meta-label">Customer</span>
            <span class="order-meta-value">${order.customerName}</span>
          </div>
          <div class="order-meta-item">
            <span class="order-meta-label">Phone</span>
            <span class="order-meta-value">${order.phone}</span>
          </div>
        </div>
        <div class="order-items-list">
          ${order.items.map(item => `
            <div class="order-item-row">
              <span class="emoji">${item.emoji}</span>
              <div class="details">
                <div class="name">${item.name}</div>
                <div class="qty">${item.quantity} × ₹${item.price}/${item.unit}</div>
              </div>
              <div class="price">₹${item.subtotal}</div>
            </div>
          `).join('')}
        </div>
        <div class="order-total-row">
          <span>Total</span>
          <span class="total-value">₹${order.total}</span>
        </div>
      </div>
    `;
  }
};
