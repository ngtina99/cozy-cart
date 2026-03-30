import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CartSummary from '../../src/components/CartSummary.vue'

describe('CartSummary', () => {
  beforeEach(() => {
    vi.stubGlobal('innerWidth', 1440)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows empty cart message when cart is empty', () => {
    const wrapper = mount(CartSummary, {
      props: {
        cart: [],
        totalCartItems: 0,
        totalCartPrice: 0,
      },
    })

    expect(wrapper.text()).toContain('Your cart is empty')
  })

  it('shows totalCartItems and totalCartPrice', () => {
    const wrapper = mount(CartSummary, {
      props: {
        cart: [
          {
            id: 1,
            name: 'Running Shoes',
            price: 89.99,
            quantity: 2,
          },
        ],
        totalCartItems: 2,
        totalCartPrice: 179.98,
      },
    })

    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('179.98')
    expect(wrapper.text()).toContain('Running Shoes')
  })
})