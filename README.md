# Cozy Cart - frontend app

## Introduction

Cozy Cart is a demo e-commerce app built with Vue 3.
It demonstrates component-based architecture, filtering, sorting, and cart management using mock data.

![cozy-cart-cover](cozy-cart-cover.png)

## Table of Contents

- [1. Usage](#1-usage)
- [2.Tech Stack](#2-tech-stack)
- [3.Features](#3-features)
- [4.Structure Explanation](#4-structure-explanation)
- [5.Vue Usage](#5-vue-usage)
- [6.Vue Usage](#6-reactivity)
- [7.Connect](#15-connect)

---

## 1. Usage

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

---

## 2. Tech Stack

- Framework: Vue 3 (3.5.30)  
- Build Tool: Vite (8.0.1)  
- Programming Language: JavaScript (ES6+)  
- Markup: HTML5  
- Styling: CSS3

---

## 3. Features
- Search products by name
- Filter products by category
- Sort products (price, rating)
- Add items to cart
- Increase quantity of existing cart items
- Dynamic categories based on product data
- Reactive total price calculation
- Disable add-to-cart for unavailable items
- Responsive design (+collapsible cart on mobile/tablet)

---

## 4. Structure Explanation

- **public/**  
  Static assets served directly (e.g. images like the logo)

- **src/assets/**  
  Global styles and resources  
  - `main.css` → global styling  

- **src/components/**  
  Reusable Vue components:
  - **FiltersBar** → search, filtering, sorting  
  - **ProductList** → product grid  
  - **ProductCard** → product display and add-to-cart  
  - **CartSummary** → cart items, totals, responsive behavior  

- **src/data/**  
  Mock product data (`products.js`)

- **App.vue**  
  Main component handling state, business logic, and component communication  

- **main.js**  
  App entry point (initializes and mounts Vue)

- **index.html**  
  Base HTML file

- **vite.config.js**  
  Vite configuration

- **package.json**  
  Project dependencies and scripts
  
---

## 6. Vue Usage

- **v-model** – Two-way binding for inputs  
- **v-bind / :** – Dynamic attributes  
- **v-for** – Render lists (products, cart items)  
- **v-if / v-else** – Conditional rendering  
- **v-show** – Toggle visibility (responsive cart)  
- **v-on / @** – Event handling

---

## 7. Connect
If you have any questions or suggestions, feel free to connect:
🔗 [LinkedIn: Valentina Nguyen](https://www.linkedin.com/in/valentina-nguyen-t/) 🙋‍♀️

*Image generated with ChatGPT*
