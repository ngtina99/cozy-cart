import { ref, computed } from 'vue'

export function useCart() {
  const cart = ref([])

  function addToCart(product) {
    const existingCartItem = cart.value.find((cartItem) => cartItem.id === product.id)

    if (existingCartItem) {
      existingCartItem.quantity += 1
      return
    }

    cart.value.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    })
  }

  const totalCartItems = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalCartPrice = computed(() => {
    return cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  return {
    cart,
    addToCart,
    totalCartItems,
    totalCartPrice,
  }
}