# 🛒 Mini E-Commerce Frontend (Vue 3)

This project is a small frontend-only e-commerce application built with **Vue 3** as part of a technical task.

The goal of the project is to demonstrate understanding of modern frontend development concepts such as component architecture, state management, filtering logic, and user interaction.

---

## 🚀 Features

- 🔍 Search products by name (case-insensitive)
- 🏷 Filter products by category
- ↕ Sort products:
  - Price: Low → High
  - Price: High → Low
  - Rating
- 🛍 Add products to cart
- ➕ Increase quantity when adding the same product
- 📊 Cart summary:
  - Total item count
  - Total price
- 🔄 Toggle between **Shop view** and **Cart view**
- ❌ Out-of-stock products are disabled

---

## 🧱 Tech Stack

- **Vue 3**
- **Composition API** (`ref`, `computed`)
- **Vite**
- **CSS (no framework)**

---

## 🧠 Concepts Demonstrated

This project covers the following Vue and frontend concepts:

- Component-based architecture
- Props and event communication (`$emit`)
- Two-way binding (`v-model`)
- Conditional rendering (`v-if`, `v-else`)
- List rendering (`v-for`)
- Computed properties for derived state:
  - filtered products
  - sorted products
  - cart totals
- Basic JavaScript:
  - array filtering
  - sorting
  - mapping
- Separation of concerns between UI and logic

---

## 📂 Project Structure


src/
│
├── components/
│ ├── FiltersBar.vue
│ ├── ProductList.vue
│ ├── ProductCard.vue
│ └── CartSummary.vue
│
├── App.vue
├── main.js
└── style.css


---

## 🛠 How to Run the Project

### 1. Install dependencies

```bash
npm install
2. Start development server
npm run dev

Then open the URL shown in the terminal (usually http://localhost:5173).

📦 Data

The project uses mock product data stored in memory (no backend, no API).

Each product includes:

id
name
price
category
inStock
rating
image
🛒 Cart Logic
Products are added to cart using their id
If a product is added multiple times → its quantity increases
No duplicate entries are created
Cart state is stored in memory (resets on refresh)
🎨 UI / UX Decisions
Clean and minimal layout for clarity
Search bar placed at the top for fast access
Filters grouped logically below search
Cart accessible via icon with item counter
Dedicated cart view for better user experience