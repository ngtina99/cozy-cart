export function getCategories(products) {
  const uniqueCategories = [...new Set(products.map((product) => product.category))]
  return ['All', ...uniqueCategories]
}

export function filterProducts(products, searchTerm, selectedCategory) {
  const search = searchTerm.trim().toLowerCase()

  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search)
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })
}

export function sortProducts(products, selectedSort) {
  const productsForSorting = [...products]

  const sortFunctions = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'rating-desc': (a, b) => b.rating - a.rating,
  }

  const sortType = sortFunctions[selectedSort]

  if (sortType) {
    productsForSorting.sort(sortType)
  }

  return productsForSorting
}