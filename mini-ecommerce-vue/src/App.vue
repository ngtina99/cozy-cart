<script setup>
import { ref, computed } from 'vue'

const products = [
  {
    id: 1,
    name: 'Running Shoes',
    price: 89.99,
    category: 'Shoes',
    inStock: true,
    rating: 4.5,
    image: 'https://via.placeholder.com/240x160?text=Running+Shoes',
  },
  {
    id: 2,
    name: 'Classic Sneakers',
    price: 74.99,
    category: 'Shoes',
    inStock: true,
    rating: 4.3,
    image: 'https://via.placeholder.com/240x160?text=Classic+Sneakers',
  },
  {
    id: 3,
    name: 'Wireless Headphones',
    price: 129.99,
    category: 'Electronics',
    inStock: true,
    rating: 4.8,
    image: 'https://via.placeholder.com/240x160?text=Headphones',
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    price: 59.99,
    category: 'Electronics',
    inStock: false,
    rating: 4.1,
    image: 'https://via.placeholder.com/240x160?text=Speaker',
  },
  {
    id: 5,
    name: 'Coffee Mug',
    price: 14.99,
    category: 'Home',
    inStock: true,
    rating: 4.2,
    image: 'https://via.placeholder.com/240x160?text=Coffee+Mug',
  },
  {
    id: 6,
    name: 'Desk Lamp',
    price: 34.99,
    category: 'Home',
    inStock: true,
    rating: 4.6,
    image: 'https://via.placeholder.com/240x160?text=Desk+Lamp',
  },
  {
    id: 7,
    name: 'Backpack',
    price: 49.99,
    category: 'Accessories',
    inStock: true,
    rating: 4.4,
    image: 'https://via.placeholder.com/240x160?text=Backpack',
  },
  {
    id: 8,
    name: 'Baseball Cap',
    price: 19.99,
    category: 'Accessories',
    inStock: false,
    rating: 3.9,
    image: 'https://via.placeholder.com/240x160?text=Baseball+Cap',
  },
]

const selectedCategory = ref('All')
const searchTerm = ref('') /* reactive empty string */
const selectedSortOption = ref('default')
const cart = ref([]) /* reactive array->quantities increase over time */

/* computed derives a value from reactive data and automatically updates it when dependencies change */
const categories = computed(() => {
  const uniqueCategories = [...new Set(products.map(product => product.category))]

  return ['All', ...uniqueCategories]
})

const filteredProducts = computed(() => {
  const search = searchTerm.value.toLowerCase()
  const selected = selectedCategory.value

  return products.filter(product => {
    const name = product.name.toLowerCase()
    const matchesSearch = name.includes(search)
    const matchesCategory = selected === 'All' || product.category === selected

    return matchesSearch && matchesCategory
  })
})

const sortedProducts = computed(() => {
  /* sortedProducts depends on filteredProducts */
  const productsForSorting = [...filteredProducts.value]

  const sortOption = selectedSortOption.value

  const sortFunctions = {
    'price-asc': (a, b) => a.price - b.price, /* lower price first */
    'price-desc': (a, b) => b.price - a.price, /* higher price first */
    'rating-desc': (a, b) => b.rating - a.rating, /* higher rating first */
  }

  const sortType = sortFunctions[sortOption]

  if (sortType) {
    productsForSorting.sort(sortType)
  }

  return productsForSorting
})

function addToCart(product) {
  /* checks if we already pushed the itemtype to the cart array */
  const existingCartItem = cart.value.find((cartItem) => {
    return cartItem.id === product.id
  })

  if (existingCartItem) {
    existingCartItem.quantity += 1
    return
  }

  cart.value.push({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
  })
}

const totalCartItems = computed(() => {
  let total = 0

  for (const item of cart.value) {
    total += item.quantity
  }

  return total
})

const totalCartPrice = computed(() => {
  let total = 0

  for (const item of cart.value) {
    total += item.price * item.quantity
  }

  return total
})
</script>

<template>
  <main>
    <h1>Mini E-Commerce Store</h1>
    <p>Vue 3 training project for ALDI technical task</p>

    <section class="filters-section">
      <div class="filter-group">
        <label for="search">Search products</label>
        <input
          id="search"
          v-model="searchTerm"
          type="text"
          placeholder="Search by product name"
        />
      </div>

      <div class="filter-group">
        <label for="category">Category</label>
        <select id="category" v-model="selectedCategory">
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label for="sort">Sort by</label>
        <select id="sort" v-model="selectedSortOption">
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating</option>
        </select>
      </div>
    </section>

    <section class="products-section">
      <h2>Products</h2>

      <div class="products-grid">
        <!-- reusable, product card, article better for SEO -->
        <article
          v-for="product in sortedProducts"
          :key="product.id"
          class="product-card"
        >
          <img :src="product.image" :alt="product.name" class="product-image" />

          <h3>{{ product.name }}</h3>
          <p>Price: ${{ product.price }}</p>
          <p>Category: {{ product.category }}</p>
          <p>Rating: {{ product.rating }}</p>
          <p>{{ product.inStock ? 'In stock' : 'Out of stock' }}</p>

          <button
            class="add-button"
            :disabled="!product.inStock"
            @click="addToCart(product)"
          >
            Add to Cart
          </button>
        </article>
      </div>
    </section>
    <section class="cart-section">
      <h2>Cart Summary</h2>

      <p>Total items: {{ totalCartItems }}</p>
      <p>Total price: ${{ totalCartPrice.toFixed(2) }}</p>

      <ul class="cart-list">
        <li v-for="cartItem in cart" :key="cartItem.id" class="cart-item">
          {{ cartItem.name }} — Quantity: {{ cartItem.quantity }} — Subtotal:
            ${{ (cartItem.price * cartItem.quantity).toFixed(2) }}
        </li>
      </ul>
    </section>
  </main>
</template>