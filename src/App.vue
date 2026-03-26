<script setup>
import { ref, computed } from 'vue'
import FiltersBar from './components/FiltersBar.vue'
import ProductList from './components/ProductList.vue'
import CartSummary from './components/CartSummary.vue'

const products = [
  // Accessories
  {
    id: 1,
    name: "Everyday Backpack",
    price: 29.99,
    category: "Accessories",
    inStock: true,
    rating: 4.6,
    image: "/images/backpack.png",
  },
  {
    id: 2,
    name: "Baseball Cap",
    price: 12.99,
    category: "Accessories",
    inStock: true,
    rating: 4.2,
    image: "/images/cap.png",
  },

  // Electronics
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: 149.99,
    category: "Electronics",
    inStock: true,
    rating: 4.7,
    image: "/images/watch.png",
  },
  {
    id: 4,
    name: "Portable Phone Charger",
    price: 24.99,
    category: "Electronics",
    inStock: true,
    rating: 4.4,
    image: "/images/powerbank.png",
  },

  // Home
  {
    id: 5,
    name: "Ceramic Coffee Mug",
    price: 14.99,
    category: "Home",
    inStock: true,
    rating: 4.2,
    image: "/images/mug.png",
  },
  {
    id: 6,
    name: "Minimalist Wall Clock",
    price: 29.99,
    category: "Home",
    inStock: true,
    rating: 4.3,
    image: "/images/clock.png",
  },
  {
    id: 7,
    name: "Soft Throw Blanket",
    price: 39.99,
    category: "Home",
    inStock: false,
    rating: 4.5,
    image: "/images/blanket.png",
  },

  // Easter
  {
    id: 8,
    name: "Easter Chocolate Box",
    price: 19.99,
    category: "Seasonal",
    inStock: true,
    rating: 4.9,
    image: "/images/easter-chocolate.png",
  },
  {
    id: 9,
    name: "Easter Bunny Toy",
    price: 15.99,
    category: "Seasonal",
    inStock: false,
    rating: 5.0,
    image: "/images/easter-bunny.png",
  },
  {
    id: 10,
    name: "Easter Flower Basket",
    price: 24.99,
    category: "Seasonal",
    inStock: true,
    rating: 4.6,
    image: "/images/easter-basket.png",
  },
  {
    id: 11,
    name: "Easter Cookie Decorating Kit",
    price: 9.99,
    category: "Seasonal",
    inStock: true,
    rating: 4.8,
    image: "/images/easter-cookies.png",
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

    <div class="page-layout">
      <section class="shop-column">
        <p v-if="hasNoMatchingProducts" class="empty-state">
          No products found for your search or selected filter.
        </p>

        <ProductList
          v-else
          :products="sortedProducts"
          @add-to-cart="addToCart"
        />
      </section>
    </div>

    <aside class="cart-column">
        <CartSummary
          :cart="cart"
          :total-cart-items="totalCartItems"
          :total-cart-price="totalCartPrice"
        />
    </aside>
  </main>
</template>