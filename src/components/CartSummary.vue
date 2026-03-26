<script setup>
defineProps({
  cart: Array,
  totalCartItems: Number,
  totalCartPrice: Number,
})
</script>

<template>
  <section class="cart-section">
    <div class="cart-header">
      <h2>Cart Summary</h2>

      <p>Total items: {{ totalCartItems }}</p>
      <p>Total price: €{{ totalCartPrice.toFixed(2) }}</p>
    </div>

    <div class="cart-items-scroll">
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