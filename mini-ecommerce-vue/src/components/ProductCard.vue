<script setup>
/* Vue macro */
defineProps({
  product: Object,
})

/* Vue emit function */
const emit = defineEmits([
    'add-to-cart',
])

function handleAddToCart() {
  emit('add-to-cart')
}
</script>

<template>
  <article class="product-card">
    <img :src="product.image" :alt="product.name" class="product-image" />

    <h3>{{ product.name }}</h3>
    <p>Price: ${{ product.price.toFixed(2) }}</p>
    <p>Category: {{ product.category }}</p>
    <p>Rating: {{ product.rating }}</p>
<!-- <p>{{ product.inStock ? 'In stock' : 'Out of stock' }}</p> -->
    <p v-if="product.inStock">In stock</p>
    <p v-else class="out-of-stock">Out of stock</p>
    <button
      class="add-button"
      :disabled="!product.inStock"
      @click="handleAddToCart"
    >
      Add to Cart
    </button>
  </article>
</template>