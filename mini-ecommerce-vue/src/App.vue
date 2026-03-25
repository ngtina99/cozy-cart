<script setup>
import { ref, computed } from 'vue'
import FiltersBar from './components/FiltersBar.vue'
import ProductList from './components/ProductList.vue'
import CartSummary from './components/CartSummary.vue'

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
const selectedSort = ref('default')
const cart = ref([]) /* reactive array->quantities increase over time */

/* computed derives a value from reactive data and automatically updates it when dependencies change */
const categories = computed(() => {
  const uniqueCategories = [...new Set(products.map(product => product.category))]

  return ['All', ...uniqueCategories]
})

const filteredProducts = computed(() => {
  const search = searchTerm.value.trim().toLowerCase()
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

  const sortOption = selectedSort.value

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

const hasNoMatchingProducts = computed(() => {
  return sortedProducts.value.length === 0
})
</script>

<template>
  <main>
    <h1>Mini E-Commerce Store</h1>
    <p>Vue 3 training project for ALDI technical task</p>

    <FiltersBar
      :search-term="searchTerm"
      :selected-category="selectedCategory"
      :selected-sort="selectedSort"
      :categories="categories"
      @update:search-term="searchTerm = $event"
      @update:selected-category="selectedCategory = $event"
      @update:selected-sort="selectedSort = $event"
    />

    <p v-if="hasNoMatchingProducts" class="empty-state">
      No products found for your search or selected filter.
    </p>

    <ProductList
      v-else
      :products="sortedProducts"
      @add-to-cart="addToCart"
    />

    <CartSummary
      :cart="cart"
      :total-cart-items="totalCartItems"
      :total-cart-price="totalCartPrice"
    />
  </main>
</template>