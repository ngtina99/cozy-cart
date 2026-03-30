import { describe, it, expect } from 'vitest'
import { useCart } from '../../src/composables/useCart'

describe('useCart', () => {
  const product = {
    id: 1,
    name: 'Running Shoes',
    price: 89.99,
    category: 'Shoes',
    inStock: true,
    rating: 4.5,
    image: 'https://example.com/shoes.jpg',
  }

  it('addToCart adds a product to cart', () => {
    const { cart, addToCart } = useCart()

    addToCart(product)

    expect(cart.value).toHaveLength(1)
    expect(cart.value[0]).toEqual({
      id: 1,
      name: 'Running Shoes',
      price: 89.99,
      quantity: 1,
    })
  })

  it('addToCart increases quantity if product is added again', () => {
    const { cart, addToCart } = useCart()

    addToCart(product)
    addToCart(product)

    expect(cart.value).toHaveLength(1)
    expect(cart.value[0].quantity).toBe(2)
  })

  it('totalCartItems returns correct item count', () => {
    const { addToCart, totalCartItems } = useCart()

    addToCart(product)
    addToCart(product)

    expect(totalCartItems.value).toBe(2)
  })

  it('totalCartPrice returns correct total price', () => {
    const { addToCart, totalCartPrice } = useCart()

    addToCart(product)
    addToCart(product)

    expect(totalCartPrice.value).toBe(179.98)
  })
})