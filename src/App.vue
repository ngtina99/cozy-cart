<script setup>
import { ref, computed } from 'vue'
import { products } from './data/products'
import FiltersBar from './components/FiltersBar.vue'
import ProductList from './components/ProductList.vue'
import CartSummary from './components/CartSummary.vue'
import { getCategories, filterProducts, sortProducts } from './utils/productFilters'
import { useCart } from './composables/useCart'

const searchTerm = ref('')
const selectedCategory = ref('All')
const selectedSort = ref('default')

const { cart, addToCart, totalCartItems, totalCartPrice } = useCart()

const categories = computed(() => getCategories(products))

const filteredProducts = computed(() =>
  filterProducts(products, searchTerm.value, selectedCategory.value),
)

const sortedProducts = computed(() =>
  sortProducts(filteredProducts.value, selectedSort.value),
)
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