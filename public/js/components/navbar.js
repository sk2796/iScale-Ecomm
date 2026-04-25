/**
 * Navbar Component — Renders the navigation bar with cart count badge.
 */
const Navbar = {
  cartCount: 0,

  render(currentPage = "home") {
    const navbar = document.getElementById("navbar");
    navbar.innerHTML = `
      <div class="navbar-inner">
        <div class="navbar-brand" onclick="App.navigate('home')" id="nav-brand">
          <div class="navbar-brand-icon">🥬</div>
          <div>
            <div class="navbar-brand-text">iScale</div>
            <div class="navbar-brand-tag">Grocery</div>
          </div>
        </div>
        <div class="navbar-actions">
          <button class="nav-btn ${currentPage === 'home' ? 'active' : ''}" onclick="App.navigate('home')" id="nav-home">
            <span class="nav-btn-icon">🏠</span>
            <span>Shop</span>
          </button>
          <button class="nav-btn ${currentPage === 'cart' ? 'active' : ''}" onclick="App.navigate('cart')" id="nav-cart">
            <span class="nav-btn-icon">🛒</span>
            <span>Cart</span>
            ${this.cartCount > 0 ? `<span class="nav-btn-badge">${this.cartCount}</span>` : ''}
          </button>
          <button class="nav-btn ${currentPage === 'orders' ? 'active' : ''}" onclick="App.navigate('orders')" id="nav-orders">
            <span class="nav-btn-icon">📋</span>
            <span>Orders</span>
          </button>
        </div>
      </div>
    `;
  },

  async updateCartCount() {
    try {
      const res = await API.getCart();
      this.cartCount = res.count || 0;
      // Update badge without full re-render
      const badge = document.querySelector("#nav-cart .nav-btn-badge");
      const cartBtn = document.getElementById("nav-cart");
      if (this.cartCount > 0) {
        if (badge) {
          badge.textContent = this.cartCount;
        } else if (cartBtn) {
          const span = document.createElement("span");
          span.className = "nav-btn-badge";
          span.textContent = this.cartCount;
          cartBtn.appendChild(span);
        }
      } else if (badge) {
        badge.remove();
      }
    } catch (e) {
      console.error("Failed to update cart count:", e);
    }
  }
};
