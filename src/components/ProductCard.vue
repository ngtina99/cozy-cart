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

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  min-height: 360px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 12px;
}

.product-image {
  width: 100%;
  height: 160px;
  margin-bottom: 12px;
  object-fit: contain;
  border-radius: 8px;
}

.product-card h3 {
  min-height: 48px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
}

.out-of-stock {
  color: #b00020;
  font-weight: 600;
}

.add-button {
  margin-top: auto;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background-color: #2e812e;
  color: #ffffff;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.add-button:hover {
  background-color: #61b961;
}

.add-button:active {
  transform: scale(0.97);
  background-color: #276f27;
}

.add-button:disabled {
  background-color: #999999;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .product-card {
    min-height: auto;
  }

  .product-card h3 {
    min-height: auto;
  }
}
</style>