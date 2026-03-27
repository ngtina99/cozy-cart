<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: Array,
})

const emit = defineEmits([
    'add-to-cart'
])

// needs product argument, because it receives it from ProductCard
function handleAddToCart(product) {
  emit('add-to-cart', product)
}
</script>

<template>
  <section class="products-section">
    <h2>Products</h2>

    <div class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </section>
</template>

<style scoped>
.products-section {
  margin-top: 32px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 260px);
  gap: 16px;
  justify-content: start;
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(3, 260px);
  }
}

@media (max-width: 1366px) {
  .products-grid {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>