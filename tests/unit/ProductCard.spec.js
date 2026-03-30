import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '../../src/components/ProductCard.vue'

describe('ProductCard', () => {
  const product = {
    id: 1,
    name: 'Running Shoes',
    price: 89.99,
    category: 'Shoes',
    inStock: true,
    rating: 4.5,
    image: 'https://example.com/shoes.jpg',
  }

  it('renders product data', () => {
    const wrapper = mount(ProductCard, {
      props: { product },
    })

    expect(wrapper.text()).toContain('Running Shoes')
    expect(wrapper.text()).toContain('89.99')
    expect(wrapper.text()).toContain('Shoes')
    expect(wrapper.text()).toContain('4.5')
  })

  it('emits add-to-cart when button is clicked', async () => {
    const wrapper = mount(ProductCard, {
      props: { product },
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('add-to-cart')).toBeTruthy()
    expect(wrapper.emitted('add-to-cart')[0]).toEqual([product])
  })

  it('shows out of stock and disables button when inStock is false', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: {
          ...product,
          inStock: false,
        },
      },
    })

    expect(wrapper.text()).toContain('Out of stock')
    expect(wrapper.get('button').attributes('disabled')).toBeDefined()
  })
})