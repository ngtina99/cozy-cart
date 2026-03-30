import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FiltersBar from '../../src/components/FiltersBar.vue'

describe('FiltersBar', () => {
  const categories = ['All', 'Shoes', 'Electronics']

  it('emits update:searchTerm when search input changes', async () => {
    const wrapper = mount(FiltersBar, {
      props: {
        searchTerm: '',
        selectedCategory: 'All',
        selectedSort: '',
        categories,
      },
    })

    await wrapper.get('#search').setValue('watch')

    expect(wrapper.emitted('update:searchTerm')).toBeTruthy()
    expect(wrapper.emitted('update:searchTerm')[0]).toEqual(['watch'])
  })

  it('emits update:selectedCategory when category changes', async () => {
    const wrapper = mount(FiltersBar, {
      props: {
        searchTerm: '',
        selectedCategory: 'All',
        selectedSort: '',
        categories,
      },
    })

    await wrapper.get('#category').setValue('Electronics')

    expect(wrapper.emitted('update:selectedCategory')).toBeTruthy()
    expect(wrapper.emitted('update:selectedCategory')[0]).toEqual(['Electronics'])
  })

  it('emits update:selectedSort when sort changes', async () => {
    const wrapper = mount(FiltersBar, {
      props: {
        searchTerm: '',
        selectedCategory: 'All',
        selectedSort: '',
        categories,
      },
    })

    await wrapper.get('#sort').setValue('price-asc')

    expect(wrapper.emitted('update:selectedSort')).toBeTruthy()
    expect(wrapper.emitted('update:selectedSort')[0]).toEqual(['price-asc'])
  })
})