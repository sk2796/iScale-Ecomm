# 🥬 iScale Grocery

A premium grocery shopping application built with Node.js, Express, and vanilla HTML/CSS/JS.

## Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start
```

Open **http://localhost:3000** in your browser.

## Features

- 🛍️ **Product Catalog** — Browse 29 grocery items across 6 categories
- 🔍 **Search & Filter** — Find items by name, description, or category
- 🛒 **Shopping Cart** — Add/remove items with real-time quantity controls
- 📦 **Checkout & Orders** — Place orders with delivery details
- 🎯 **Free Delivery** — Orders above ₹500 get free delivery
- 📋 **Order History** — View all past orders

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express |
| Frontend | Vanilla HTML/CSS/JS |
| Data | In-memory store |
| Fonts | Inter (Google Fonts) |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (?category=X&search=Q) |
| GET | `/api/products/:id` | Get product |
| GET | `/api/cart` | Get cart |
| POST | `/api/cart` | Add to cart |
| PUT | `/api/cart/:id` | Update quantity |
| DELETE | `/api/cart/:id` | Remove from cart |
| DELETE | `/api/cart` | Clear cart |
| POST | `/api/orders` | Place order |
| GET | `/api/orders` | List orders |
| GET | `/api/orders/:id` | Get order |

## Project Structure

```
├── server/
│   ├── index.js              # Express server
│   ├── data/products.js      # Product seed data
│   ├── store/store.js        # In-memory data store
│   └── routes/
│       ├── products.js       # Product API
│       ├── cart.js            # Cart API
│       └── orders.js         # Order API
├── public/
│   ├── index.html            # SPA shell
│   ├── css/styles.css        # Design system
│   └── js/
│       ├── api.js            # API client
│       ├── router.js         # Client router
│       ├── app.js            # App controller
│       ├── components/       # UI components
│       └── pages/            # Page modules
└── package.json
```

## Categories

🍎 Fruits • 🥦 Vegetables • 🥛 Dairy • 🍞 Bakery • ☕ Beverages • 🍫 Snacks
