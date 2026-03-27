<script setup>
import { ref, computed } from 'vue'
import FiltersBar from './components/FiltersBar.vue'
import ProductList from './components/ProductList.vue'
import CartSummary from './components/CartSummary.vue'
import { products } from './data/products'

const selectedCategory = ref('All')
const searchTerm = ref('') // reactive empty string
const selectedSort = ref('default')
const cart = ref([]) // reactive array->quantities increase over time

// computed derives a value from reactive data and automatically updates it when dependencies change
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
  // sortedProducts depends on filteredProducts
  const productsForSorting = [...filteredProducts.value]

  const sortOption = selectedSort.value

  const sortFunctions = {
    'price-asc': (a, b) => a.price - b.price, // lower price first
    'price-desc': (a, b) => b.price - a.price, // higher price first
    'rating-desc': (a, b) => b.rating - a.rating, // higher rating first
  }

  const sortType = sortFunctions[sortOption]

  if (sortType) {
    productsForSorting.sort(sortType)
  }

  return productsForSorting
})

function addToCart(product) {
  // checks if we already pushed the itemtype to the cart array
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

    <FiltersBar
      :search-term="searchTerm"
      :selected-category="selectedCategory"
      :selected-sort="selectedSort"
      :categories="categories"
      @update:search-term="searchTerm = $event"
      @update:selected-category="selectedCategory = $event"
      @update:selected-sort="selectedSort = $event"
    />

        <p v-if="sortedProducts.length === 0" class="empty-state">
          No products found for your search or selected filter.
        </p>

        <ProductList
          v-else
          :products="sortedProducts"
          @add-to-cart="addToCart"
        />

    <aside class="cart-column">
        <CartSummary
          :cart="cart"
          :total-cart-items="totalCartItems"
          :total-cart-price="totalCartPrice"
        />
    </aside>
  </main>
</template>