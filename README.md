# Cozy Cart

## Introduction

Cozy Cart is a demo frontend-only e-commerce app built with Vue 3.
It demonstrates component-based architecture, filtering, sorting, and cart management using mock data.


## Usage

1.Clone the repository in your terminal:
```bash
git clone git@github.com:ngtina99/cozy-cart.git
cd cozy-cart
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Then open the URL shown in the terminal
*usually:
```txt
http://localhost:5173
```

## Tech Stack

- Framework: Vue 3 (3.5.30)  
- Build Tool: Vite (8.0.1)  
- Programming Language: JavaScript (ES6+)  
- Markup: HTML5  
- Styling: CSS3  

## Features
- Search products by name
- Filter products by category
- Sort products (price, rating)
- Add items to cart
- Increase quantity of existing cart items
- Dynamic total price calculation
- Disable add-to-cart for unavailable items
- Responsive design (+collapsible cart on mobile/tablet)

## 🧠 Structure Explanation

### public/
Contains static assets that are served directly (e.g. images like the logo).

### src/assets/
Stores global styles and static resources used inside the app.  
- `main.css` → global styling applied across the application  

### src/components/
Contains reusable Vue components:
- **FiltersBar** → search input, category filter, and sorting controls  
- **ProductList** → renders the list/grid of products  
- **ProductCard** → displays individual product details and handles add-to-cart  
- **CartSummary** → shows cart items, totals, and responsive behavior  

### src/data/
Holds mock data used by the application (`products.js`).

### App.vue
Root component responsible for:
- managing application state (products, filters, cart)  
- handling business logic  
- passing data and events between components  

### main.js
Entry point of the application that initializes and mounts Vue.

### index.html
Base HTML file where the Vue app is injected.

### vite.config.js
Configuration file for the Vite build tool.

### package.json
Defines project dependencies and scripts.

---

## 🏆 Why this structure

This structure separates concerns clearly:

- UI components → `components/`  
- Data → `data/`  
- Global styles → `assets/`  
- App logic → `App.vue`  

👉 This makes the project scalable, maintainable, and easy to navigate.