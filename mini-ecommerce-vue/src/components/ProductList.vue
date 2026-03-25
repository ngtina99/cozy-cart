<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: Array,
})

const emit = defineEmits([
    'add-to-cart'
])

function handleAddToCart() {
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