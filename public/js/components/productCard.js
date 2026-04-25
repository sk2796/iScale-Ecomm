/**
 * ProductCard Component — Renders a single product card with add-to-cart.
 * Tracks quantities of items already in cart.
 */
const ProductCard = {
  cartQuantities: {}, // productId -> quantity

  render(product) {
    const inCart = this.cartQuantities[product.id] || 0;
    const isOutOfStock = !product.inStock;

    return `
      <div class="product-card ${isOutOfStock ? 'out-of-stock' : ''}" id="product-${product.id}">
        <div class="product-card-image">
          <span class="badge-category">${product.category}</span>
          ${isOutOfStock ? '<span class="product-card-badge badge-out">Out of Stock</span>' : ''}
          <span class="emoji">${product.emoji}</span>
        </div>
        <div class="product-card-body">
          <div class="product-card-name">${product.name}</div>
          <div class="product-card-desc">${product.description}</div>
          <div class="product-card-footer">
            <div class="product-price">
              <span class="amount">₹${product.price}</span>
              <span class="unit">/ ${product.unit}</span>
            </div>
            ${isOutOfStock
              ? `<button class="btn-add-cart" disabled>Unavailable</button>`
              : inCart > 0
                ? `<div class="qty-control">
                    <button class="qty-btn" onclick="ProductCard.updateQty('${product.id}', ${inCart - 1})">−</button>
                    <span class="qty-value">${inCart}</span>
                    <button class="qty-btn" onclick="ProductCard.updateQty('${product.id}', ${inCart + 1})">+</button>
                  </div>`
                : `<button class="btn-add-cart" onclick="ProductCard.addToCart('${product.id}')">
                    <span>🛒</span> Add
                  </button>`
            }
          </div>
        </div>
      </div>
    `;
  },

  async addToCart(productId) {
    try {
      const res = await API.addToCart(productId, 1);
      this.syncQuantities(res.data);
      Navbar.updateCartCount();
      App.showToast("Added to cart!", "success");
      // Re-render just this card
      if (HomePage.currentProducts) {
        const product = HomePage.currentProducts.find(p => p.id === productId);
        if (product) {
          const el = document.getElementById(`product-${productId}`);
          if (el) {
            el.outerHTML = this.render(product);
          }
        }
      }
    } catch (err) {
      App.showToast(err.message, "error");
    }
  },

  async updateQty(productId, qty) {
    try {
      if (qty <= 0) {
        const res = await API.removeFromCart(productId);
        this.syncQuantities(res.data);
      } else {
        const res = await API.updateCartItem(productId, qty);
        this.syncQuantities(res.data);
      }
      Navbar.updateCartCount();
      // Re-render just this card
      if (HomePage.currentProducts) {
        const product = HomePage.currentProducts.find(p => p.id === productId);
        if (product) {
          const el = document.getElementById(`product-${productId}`);
          if (el) {
            el.outerHTML = this.render(product);
          }
        }
      }
    } catch (err) {
      App.showToast(err.message, "error");
    }
  },

  syncQuantities(cartItems) {
    this.cartQuantities = {};
    if (cartItems) {
      cartItems.forEach(item => {
        this.cartQuantities[item.productId] = item.quantity;
      });
    }
  }
};
