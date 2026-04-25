/**
 * Home Page — Product listing with category filters and search.
 */
const HomePage = {
  currentCategory: "all",
  currentSearch: "",
  currentProducts: [],
  searchTimeout: null,

  async render() {
    const app = document.getElementById("app");
    Navbar.render("home");

    app.innerHTML = `
      <section class="hero">
        <div class="hero-badge">🌿 Farm Fresh • Daily Delivery</div>
        <h1>Fresh Groceries,<br/><span class="gradient-text">Delivered Fast</span></h1>
        <p>Premium quality fruits, vegetables, dairy, and more — straight from the farm to your kitchen.</p>
        <div class="search-container">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            class="search-input"
            id="search-input"
            placeholder="Search for groceries..."
            value="${this.currentSearch}"
            oninput="HomePage.onSearch(this.value)"
          />
        </div>
        <div class="category-filters" id="category-filters"></div>
      </section>
      <div id="product-count" class="product-count"></div>
      <div id="products-container" class="products-grid">
        <div class="loading-container"><div class="loader"></div></div>
      </div>
    `;

    this.renderCategories();
    await this.loadProducts();
  },

  renderCategories() {
    const categories = [
      { id: "all", label: "All", emoji: "🛍️" },
      { id: "fruits", label: "Fruits", emoji: "🍎" },
      { id: "vegetables", label: "Vegetables", emoji: "🥦" },
      { id: "dairy", label: "Dairy", emoji: "🥛" },
      { id: "bakery", label: "Bakery", emoji: "🍞" },
      { id: "beverages", label: "Beverages", emoji: "☕" },
      { id: "snacks", label: "Snacks", emoji: "🍫" }
    ];

    const container = document.getElementById("category-filters");
    container.innerHTML = categories.map(cat => `
      <button
        class="category-btn ${this.currentCategory === cat.id ? 'active' : ''}"
        onclick="HomePage.filterByCategory('${cat.id}')"
        id="cat-${cat.id}"
      >
        <span class="cat-emoji">${cat.emoji}</span>${cat.label}
      </button>
    `).join('');
  },

  async loadProducts() {
    const container = document.getElementById("products-container");
    const countEl = document.getElementById("product-count");

    try {
      // Sync cart quantities first
      const cartRes = await API.getCart();
      ProductCard.syncQuantities(cartRes.data);

      const res = await API.getProducts(this.currentCategory, this.currentSearch);
      this.currentProducts = res.data;

      countEl.innerHTML = `Showing <strong>${res.count}</strong> ${res.count === 1 ? 'product' : 'products'}`;

      if (res.data.length === 0) {
        container.innerHTML = `
          <div class="empty-state" style="grid-column: 1/-1">
            <div class="empty-state-emoji">🔍</div>
            <h2>No products found</h2>
            <p>Try a different search term or category.</p>
            <button class="btn-primary" onclick="HomePage.clearSearch()">
              ← Show All Products
            </button>
          </div>
        `;
        return;
      }

      container.innerHTML = res.data.map(p => ProductCard.render(p)).join('');
    } catch (err) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1">
          <div class="empty-state-emoji">⚠️</div>
          <h2>Failed to load products</h2>
          <p>${err.message}</p>
          <button class="btn-primary" onclick="HomePage.loadProducts()">Retry</button>
        </div>
      `;
    }
  },

  filterByCategory(category) {
    this.currentCategory = category;
    this.currentSearch = "";
    const searchEl = document.getElementById("search-input");
    if (searchEl) searchEl.value = "";
    this.renderCategories();
    this.loadProducts();
  },

  onSearch(value) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.currentSearch = value.trim();
      if (value.trim()) {
        this.currentCategory = "all";
        this.renderCategories();
      }
      this.loadProducts();
    }, 300);
  },

  clearSearch() {
    this.currentSearch = "";
    this.currentCategory = "all";
    const searchEl = document.getElementById("search-input");
    if (searchEl) searchEl.value = "";
    this.renderCategories();
    this.loadProducts();
  }
};
