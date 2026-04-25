/**
 * Simple client-side router — maps page names to render functions.
 */
const Router = {
  routes: {
    home: () => HomePage.render(),
    cart: () => CartPage.render(),
    checkout: () => CheckoutPage.render(),
    "order-confirm": (params) => OrderConfirmPage.render(params),
    orders: (params) => OrderConfirmPage.render({})
  },

  async navigate(page, params = {}) {
    const renderFn = this.routes[page];
    if (renderFn) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      await renderFn(params);
    } else {
      console.warn(`Route not found: ${page}`);
      await this.routes.home();
    }
  }
};
