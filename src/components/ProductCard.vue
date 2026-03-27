<script setup>
const { product } = defineProps({
  product: Object,
})

const emit = defineEmits([
    'add-to-cart',
])

function addToCart() {
  emit('add-to-cart', product)
}
</script>

<template>
  <article class="product-card">
    <img :src="product.image" :alt="product.name" class="product-image" />

    <h3>
      {{ product.name }}
      <span v-if="product.category === 'Seasonal'">🐰</span>
    </h3>
    <p>Price: €{{ product.price.toFixed(2) }}</p>
    <p>Category: {{ product.category }}</p>
    <p>Rating: {{ product.rating }}</p>
<!-- <p>{{ product.inStock ? 'In stock' : 'Out of stock' }}</p> -->
    <p v-if="product.inStock">In stock</p>
    <p v-else class="out-of-stock">Out of stock</p>
    <button
      class="add-button"
      :disabled="!product.inStock"
      @click="addToCart"
    >
      Add to Cart
    </button>
  </article>
</template>