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

<style scoped>
.cart-section {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 40px);
  padding: 20px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 16px;
}

.cart-header {
  flex-shrink: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.cart-header h2 {
  margin-bottom: 12px;
}

.cart-header.clickable {
  cursor: pointer;
}

.cart-items-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 16px 20px 20px;
}

.cart-items-scroll::-webkit-scrollbar {
  width: 8px;
}

.cart-items-scroll::-webkit-scrollbar-thumb {
  background-color: #c7c7c7;
  border-radius: 999px;
}

.cart-items-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.cart-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.empty-cart {
  margin: 0;
  color: #6b7280;
}

.cart-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item-name {
  font-weight: 600;
}

.cart-item-details {
  font-size: 14px;
  color: #4b5563;
}

@media (max-width: 1366px) {
  .cart-section {
    height: auto;
    max-height: none;
  }

  .cart-items-scroll {
    overflow: visible;
  }
}
</style>