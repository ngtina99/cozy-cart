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

const searchTerm = ref('') /* reactive empty string */

/* computed creates a reactive value that automatically updates when its dependencies change */
const filteredProducts = computed(() => {
  const search = searchTerm.value.toLowerCase()

  /* new array with the products matching with the search */
  return products.filter(product => {
    const productName = product.name.toLowerCase()
    return productName.includes(search)
  })
})

const selectedCategory = ref('All')

const categories = computed(() => {
  const uniqueCategories = products.map((product) => product.category)

  return ['All', ...new Set(uniqueCategories)]
})
</script>

<template>
  <main>
    <h1>Mini E-Commerce Store</h1>
    <p>Vue 3 training project for ALDI technical task</p>

    <section class="filters-section">
      <label for="search">Search products</label>
      <input
        id="search"
        v-model="searchTerm"
        type="text"
        placeholder="Search by product name"
      />
    </section>

    <section class="products-section">
      <h2>Products</h2>

      <div class="products-grid">
        <!-- reusable, product card, article better for SEO -->
        <article
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
        >
          <img :src="product.image" :alt="product.name" class="product-image" />

          <h3>{{ product.name }}</h3>
          <p>Price: ${{ product.price }}</p>
          <p>Category: {{ product.category }}</p>
          <p>Rating: {{ product.rating }}</p>
          <p>{{ product.inStock ? 'In stock' : 'Out of stock' }}</p>
        </article>
      </div>
    </section>
  </main>
</template>