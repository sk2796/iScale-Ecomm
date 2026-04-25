/**
 * CartItem Component — Renders a single cart line item with quantity controls.
 */
const CartItem = {
  render(item) {
    const product = item.product;
    if (!product) return '';

    return `
      <div class="cart-item" id="cart-item-${item.productId}">
        <div class="cart-item-emoji">${product.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-price">₹${product.price} / ${product.unit}</div>
        </div>
        <div class="qty-control">
          <button class="qty-btn" onclick="CartPage.updateItem('${item.productId}', ${item.quantity - 1})">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" onclick="CartPage.updateItem('${item.productId}', ${item.quantity + 1})">+</button>
        </div>
        <div class="cart-item-subtotal">₹${item.subtotal}</div>
        <button class="cart-item-remove" onclick="CartPage.removeItem('${item.productId}')" title="Remove item">
          ✕
        </button>
      </div>
    `;
  }
};
