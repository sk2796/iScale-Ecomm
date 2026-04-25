/**
 * Seed data for grocery products
 * Each product has id, name, category, price, unit, emoji, description, inStock
 */
const products = [
  // ── Fruits ──
  {
    id: "fruit-001",
    name: "Royal Gala Apples",
    category: "fruits",
    price: 180,
    unit: "kg",
    emoji: "🍎",
    description: "Crisp, sweet, and juicy premium apples from Himachal orchards.",
    inStock: true
  },
  {
    id: "fruit-002",
    name: "Cavendish Bananas",
    category: "fruits",
    price: 45,
    unit: "dozen",
    emoji: "🍌",
    description: "Perfectly ripe golden bananas, rich in potassium and energy.",
    inStock: true
  },
  {
    id: "fruit-003",
    name: "Alphonso Mangoes",
    category: "fruits",
    price: 450,
    unit: "kg",
    emoji: "🥭",
    description: "The king of mangoes — sweet, aromatic, and lusciously golden.",
    inStock: true
  },
  {
    id: "fruit-004",
    name: "Valencia Oranges",
    category: "fruits",
    price: 120,
    unit: "kg",
    emoji: "🍊",
    description: "Juicy seedless oranges bursting with fresh citrus flavor.",
    inStock: true
  },
  {
    id: "fruit-005",
    name: "Thompson Grapes",
    category: "fruits",
    price: 95,
    unit: "kg",
    emoji: "🍇",
    description: "Seedless green grapes — sweet, crunchy, and refreshing.",
    inStock: true
  },
  {
    id: "fruit-006",
    name: "Strawberry Basket",
    category: "fruits",
    price: 160,
    unit: "pack",
    emoji: "🍓",
    description: "Fresh, hand-picked strawberries from Mahabaleshwar farms.",
    inStock: false
  },

  // ── Vegetables ──
  {
    id: "veg-001",
    name: "Organic Tomatoes",
    category: "vegetables",
    price: 40,
    unit: "kg",
    emoji: "🍅",
    description: "Farm-fresh organic tomatoes — perfect for curries and salads.",
    inStock: true
  },
  {
    id: "veg-002",
    name: "Baby Spinach",
    category: "vegetables",
    price: 35,
    unit: "pack",
    emoji: "🥬",
    description: "Tender baby spinach leaves, washed and ready to cook.",
    inStock: true
  },
  {
    id: "veg-003",
    name: "Fresh Broccoli",
    category: "vegetables",
    price: 75,
    unit: "pack",
    emoji: "🥦",
    description: "Crisp green broccoli florets packed with vitamins and fiber.",
    inStock: true
  },
  {
    id: "veg-004",
    name: "Sweet Corn Cobs",
    category: "vegetables",
    price: 60,
    unit: "pack",
    emoji: "🌽",
    description: "Tender sweet corn — great for grilling, boiling, or stir-fry.",
    inStock: true
  },
  {
    id: "veg-005",
    name: "Red Bell Peppers",
    category: "vegetables",
    price: 85,
    unit: "kg",
    emoji: "🫑",
    description: "Vibrant red bell peppers — sweet, crunchy, and versatile.",
    inStock: true
  },
  {
    id: "veg-006",
    name: "Premium Potatoes",
    category: "vegetables",
    price: 30,
    unit: "kg",
    emoji: "🥔",
    description: "Clean, sorted potatoes ideal for everyday cooking.",
    inStock: true
  },

  // ── Dairy ──
  {
    id: "dairy-001",
    name: "Full Cream Milk",
    category: "dairy",
    price: 68,
    unit: "ltr",
    emoji: "🥛",
    description: "Farm-fresh pasteurized full cream milk — pure and rich.",
    inStock: true
  },
  {
    id: "dairy-002",
    name: "Greek Yogurt",
    category: "dairy",
    price: 90,
    unit: "pack",
    emoji: "🍶",
    description: "Thick, creamy Greek yogurt — high protein and probiotics.",
    inStock: true
  },
  {
    id: "dairy-003",
    name: "Cheddar Cheese Block",
    category: "dairy",
    price: 220,
    unit: "pack",
    emoji: "🧀",
    description: "Aged cheddar cheese with rich, sharp flavor. 200g block.",
    inStock: true
  },
  {
    id: "dairy-004",
    name: "Farm Fresh Eggs",
    category: "dairy",
    price: 85,
    unit: "dozen",
    emoji: "🥚",
    description: "Free-range farm eggs — rich yolks, superior taste.",
    inStock: true
  },
  {
    id: "dairy-005",
    name: "Salted Butter",
    category: "dairy",
    price: 55,
    unit: "pack",
    emoji: "🧈",
    description: "Creamy salted butter — perfect for toast and cooking. 100g.",
    inStock: true
  },

  // ── Bakery ──
  {
    id: "bakery-001",
    name: "Sourdough Loaf",
    category: "bakery",
    price: 120,
    unit: "pack",
    emoji: "🍞",
    description: "Artisan sourdough bread with a crispy crust and tangy crumb.",
    inStock: true
  },
  {
    id: "bakery-002",
    name: "Butter Croissants",
    category: "bakery",
    price: 150,
    unit: "pack",
    emoji: "🥐",
    description: "Flaky, golden butter croissants — baked fresh daily. Pack of 4.",
    inStock: true
  },
  {
    id: "bakery-003",
    name: "Multigrain Bagels",
    category: "bakery",
    price: 100,
    unit: "pack",
    emoji: "🥯",
    description: "Hearty multigrain bagels — chewy, nutritious, delicious. Pack of 4.",
    inStock: true
  },
  {
    id: "bakery-004",
    name: "Chocolate Muffins",
    category: "bakery",
    price: 180,
    unit: "pack",
    emoji: "🧁",
    description: "Rich double chocolate muffins with gooey centers. Pack of 6.",
    inStock: true
  },

  // ── Beverages ──
  {
    id: "bev-001",
    name: "Cold Pressed Orange Juice",
    category: "beverages",
    price: 130,
    unit: "ltr",
    emoji: "🧃",
    description: "100% cold pressed orange juice — no sugar, no preservatives.",
    inStock: true
  },
  {
    id: "bev-002",
    name: "Darjeeling Green Tea",
    category: "beverages",
    price: 250,
    unit: "pack",
    emoji: "🍵",
    description: "Premium Darjeeling green tea leaves — 100g loose leaf tin.",
    inStock: true
  },
  {
    id: "bev-003",
    name: "Arabica Coffee Beans",
    category: "beverages",
    price: 380,
    unit: "pack",
    emoji: "☕",
    description: "Single estate Arabica coffee beans from Coorg. 250g bag.",
    inStock: true
  },
  {
    id: "bev-004",
    name: "Coconut Water",
    category: "beverages",
    price: 40,
    unit: "pack",
    emoji: "🥥",
    description: "Natural tender coconut water — refreshing and hydrating.",
    inStock: true
  },

  // ── Snacks ──
  {
    id: "snack-001",
    name: "Trail Mix Premium",
    category: "snacks",
    price: 320,
    unit: "pack",
    emoji: "🥜",
    description: "Almonds, cashews, raisins, and cranberries blend. 250g pack.",
    inStock: true
  },
  {
    id: "snack-002",
    name: "Quinoa Chips",
    category: "snacks",
    price: 140,
    unit: "pack",
    emoji: "🍿",
    description: "Crunchy baked quinoa chips — lightly salted, guilt-free snacking.",
    inStock: true
  },
  {
    id: "snack-003",
    name: "Dark Chocolate 70%",
    category: "snacks",
    price: 195,
    unit: "pack",
    emoji: "🍫",
    description: "Premium 70% cocoa dark chocolate — rich, smooth, and intense.",
    inStock: true
  },
  {
    id: "snack-004",
    name: "Roasted Makhana",
    category: "snacks",
    price: 110,
    unit: "pack",
    emoji: "✨",
    description: "Lightly spiced roasted fox nuts — a healthy Indian snack. 100g.",
    inStock: true
  }
];

module.exports = products;
