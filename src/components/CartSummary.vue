<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  cart: Array,
  totalCartItems: Number,
  totalCartPrice: Number,
})

const isMobileOrTablet = ref(false)
const isCartOpen = ref(false)

function updateScreenSize() {
  const isSmallScreen = window.innerWidth <= 1024

  if (isSmallScreen && !isMobileOrTablet.value) {
    isCartOpen.value = false
  }

  if (!isSmallScreen && isMobileOrTablet.value) {
    isCartOpen.value = true
  }

  isMobileOrTablet.value = isSmallScreen
}

function toggleCart() {
  if (isMobileOrTablet.value) {
    isCartOpen.value = !isCartOpen.value
  }
}

onMounted(() => {
  updateScreenSize()
  window.addEventListener('resize', updateScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})
</script>

<template>
  <section class="cart-section">
    <div
      class="cart-header"
      :class="{ clickable: isMobileOrTablet }"
      @click="toggleCart"
    >
      <h2>Cart Summary
        <span v-if="isMobileOrTablet">
          {{ isCartOpen ? '▲' : '▼' }}
        </span>
      </h2>

      <p>Total items: {{ totalCartItems }}</p>
      <p>Total price: €{{ totalCartPrice.toFixed(2) }}</p>
    </div>

    <div v-show="!isMobileOrTablet || isCartOpen" class="cart-items-scroll">
      <p v-if="cart.length === 0" class="empty-cart">Your cart is empty.</p>

      <ul v-else class="cart-list">
        <li v-for="cartItem in cart" :key="cartItem.id" class="cart-item">
          <span class="cart-item-name">{{ cartItem.name }}</span>
          <span class="cart-item-details">
            Quantity: {{ cartItem.quantity }}
          </span>
          <span class="cart-item-details">
            Subtotal: €{{ (cartItem.price * cartItem.quantity).toFixed(2) }}
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>