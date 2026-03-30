import { describe, it, expect } from 'vitest'
import { getCategories, filterProducts, sortProducts } from '../../src/utils/productFilters'

describe('productFilters', () => {
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
    {
      id: 3,
      name: 'Leather Boots',
      price: 129.99,
      category: 'Shoes',
      inStock: false,
      rating: 4.2,
      image: 'https://example.com/boots.jpg',
    },
    {
      id: 4,
      name: 'Wireless Headphones',
      price: 149.99,
      category: 'Electronics',
      inStock: true,
      rating: 4.7,
      image: 'https://example.com/headphones.jpg',
    },
  ]

  it('getCategories returns All plus unique categories', () => {
    const result = getCategories(products)
    expect(result).toEqual(['All', 'Shoes', 'Electronics'])
  })

  it('filterProducts filters by selectedCategory', () => {
    const result = filterProducts(products, '', 'Shoes')
    expect(result).toHaveLength(2)
    expect(result.every((product) => product.category === 'Shoes')).toBe(true)
  })

  it('filterProducts filters by searchTerm case-insensitively', () => {
    const result = filterProducts(products, 'watch', 'All')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Smart Watch')
  })

  it('filterProducts combines searchTerm and selectedCategory', () => {
    const result = filterProducts(products, 'wireless', 'Electronics')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Wireless Headphones')
  })

  it('sortProducts sorts by price ascending', () => {
    const result = sortProducts(products, 'price-asc')
    expect(result.map((product) => product.price)).toEqual([89.99, 129.99, 149.99, 199.99])
  })

  it('sortProducts sorts by price descending', () => {
    const result = sortProducts(products, 'price-desc')
    expect(result.map((product) => product.price)).toEqual([199.99, 149.99, 129.99, 89.99])
  })

  it('sortProducts sorts by rating descending', () => {
    const result = sortProducts(products, 'rating-desc')
    expect(result.map((product) => product.rating)).toEqual([4.8, 4.7, 4.5, 4.2])
  })

  it('sortProducts does not mutate the original products array', () => {
    const originalProducts = [...products]
    sortProducts(products, 'price-asc')
    expect(products).toEqual(originalProducts)
  })
})