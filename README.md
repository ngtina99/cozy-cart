Mini E-Commerce Store
Vue 3 training project for ALDI technical task


App.vue

Owns state and business logic

FiltersBar.vue

Handles filter UI

ProductList.vue

Handles list rendering

ProductCard.vue

Handles one product card

CartSummary.vue

Handles cart display

That is very good component architecture.

This directly supports:

clean code
maintainability
readability
team collaboration
code reviews
future extensions

App.vue = state + business logic + coordination
FiltersBar.vue = filter UI only
ProductList.vue = list of products
ProductCard.vue = one product card
CartSummary.vue = cart display only

Keep in App.vue:

products
searchTerm
selectedCategory
selectedSort
cart
categories
filteredProducts
sortedProducts
addToCart
totalCartItems
totalCartPrice

Why?

Because these are the app’s main state and business rules.


Keep in App.vue:

products
searchTerm
selectedCategory
selectedSort
cart
categories
filteredProducts
sortedProducts
addToCart
totalCartItems
totalCartPrice


Move out:

the filter controls
the product list loop
the single product card markup
the cart summary markup

Why?

Because those are UI sections with clear responsibilities.

Vue 3
Vue 3 Vite project

Composition API
- <script setup>
- ref(...)
- computed(...)

- for for rendering lists
products
category options

## Testing & Refactoring (Optional)

An extended version of this project includes extracted business logic and unit tests using Vitest.

You can explore it in the branch:

feature/testing-and-logic-refactor