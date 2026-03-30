import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductList from '../../src/components/ProductList.vue'
import ProductCard from '../../src/components/ProductCard.vue'

describe('ProductList', () => {
  const products = [
    {
      id: 1,
      name: 'Running Shoes',
      price: 89.99,
      category: 'Shoes',
      inStock: true,
      rating: 4.5,
      image: 'https://example.com/shoes.jpg',
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      category: 'Electronics',
      inStock: true,
      rating: 4.8,
      image: 'https://example.com/watch.jpg',
    },
  ]

  it('renders one ProductCard for each product', () => {
    const wrapper = mount(ProductList, {
      props: { products },
    })

    const productCards = wrapper.findAllComponents(ProductCard)
    expect(productCards).toHaveLength(2)
  })

  it('re-emits add-to-cart from ProductCard', async () => {
    const wrapper = mount(ProductList, {
      props: { products },
    })

    const productCard = wrapper.findComponent(ProductCard)
    productCard.vm.$emit('add-to-cart', products[0])

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('add-to-cart')).toBeTruthy()
    expect(wrapper.emitted('add-to-cart')[0]).toEqual([products[0]])
  })
})