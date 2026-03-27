<script setup>
import { ref, computed } from 'vue'
import { products } from './data/products'
import FiltersBar from './components/FiltersBar.vue'
import ProductList from './components/ProductList.vue'
import CartSummary from './components/CartSummary.vue'

const searchTerm = ref('')
const selectedCategory = ref('All')
const selectedSort = ref('default')
const cart = ref([])

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
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'rating-desc': (a, b) => b.rating - a.rating,
  }

  const sortType = sortFunctions[sortOption]

  if (sortType) {
    productsForSorting.sort(sortType)
  }

  return productsForSorting
})

function addToCart(product) {
  // checks if we already pushed the item type to the cart array
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
  return cart.value.reduce((total, item) => total + item.quantity, 0)
})

const totalCartPrice = computed(() => {
  return cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
})
</script>

<template>
  <main>
    <FiltersBar
      v-model:searchTerm="searchTerm"
      v-model:selectedCategory="selectedCategory"
      v-model:selectedSort="selectedSort"
      :categories="categories"
    />

    <p v-if="sortedProducts.length === 0" class="empty-state">
      No products found. Try a different search.
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