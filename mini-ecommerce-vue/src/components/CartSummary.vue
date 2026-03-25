<script setup>
defineProps({
  cart: Array,
  totalCartItems: Number,
  totalCartPrice: Number,
})
</script>

<template>
  <section class="cart-section">
    <h2>Cart Summary</h2>

    <p>Total items: {{ totalCartItems }}</p>
    <p>Total price: ${{ totalCartPrice.toFixed(2) }}</p>

    <p v-if="cart.length === 0">Your cart is empty.</p>

    <ul v-else class="cart-list">
      <li v-for="cartItem in cart" :key="cartItem.id" class="cart-item">
        {{ cartItem.name }} — Quantity: {{ cartItem.quantity }} — Subtotal:
        ${{ (cartItem.price * cartItem.quantity).toFixed(2) }}
      </li>
    </ul>
  </section>
</template>