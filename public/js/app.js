/**
 * App Controller — Entry point for the frontend application.
 */
const App = {
  currentPage: "home",

  async init() {
    await this.navigate("home");
    Navbar.updateCartCount();
  },

  async navigate(page, params = {}) {
    this.currentPage = page;
    await Router.navigate(page, params);
  },

  /**
   * Show a toast notification.
   * @param {string} message
   * @param {"success"|"error"} type
   */
  showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === "success" ? "✅" : "❌"}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    // Auto-remove
    setTimeout(() => {
      toast.classList.add("removing");
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
};

// ── Boot ──
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
