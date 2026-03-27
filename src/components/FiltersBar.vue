<script setup>

import { computed } from 'vue'

// Vue macro: expects values from the parent
const props = defineProps({
  searchTerm: String, // current search text
  selectedCategory: String,
  selectedSort: String,
  categories: Array,
})

// Vue emit function: send these 3 events upward
const emit = defineEmits([
  'update:searchTerm', // search changes, notify parent
  'update:selectedCategory',
  'update:selectedSort',
])

function createModel(propName) {
  return computed({
    get: () => props[propName],
    set: (value) => emit(`update:${propName}`, value),
  })
}

const searchModel = createModel('searchTerm')
const categoryModel = createModel('selectedCategory')
const sortModel = createModel('selectedSort')
</script>

<template>
  <section class="filters-section">
    <div class="search-row">

      <div class="logo-box">
        <img src="/images/logo.png" alt="Shop logo" class="site-logo" />
      </div>

      <div class="filter-group search-group">
          <!-- listens to the input event -->
          <input
              id="search"
              v-model="searchModel"
              type="text"
              placeholder="Search by product name"
          />
      </div>
    </div>

    <div class="filters-row">
      <div class="filter-group sort-inline">
        <span class="sort-prefix">Category</span>
            <!-- binding, sets the value from parent → child, listens when user changes it -->
            <select
                id="category"
                v-model="categoryModel"
            >
                <!-- :key is for Vue -->
                <option
                v-for="category in categories"
                :key="category"
                :value="category"
                >
                {{ category }}
                </option>
            </select>
        </div>

        <div class="filter-group sort-inline">
            <span class="sort-prefix">Sort by</span>
            <select
                id="sort" 
                v-model="sortModel"
            >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
            </select>
        </div>
    </div>
  </section>
</template>

<style scoped>
.logo-box {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.site-logo {
  height: 70px;
  width: auto;
}

.filters-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.search-row {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 1088px;
}

.search-group {
  flex: 1;
  min-width: 0;
}

.search-group input {
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
}

.filters-row {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 16px;
}

.filter-group {
  min-width: 220px;
}

.filter-group input,
.filter-group select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  font: inherit;
  background-color: #ffffff;
}

.sort-inline {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sort-prefix {
  white-space: nowrap;
  font-weight: 600;
  color: #4b5563;
}

@media (max-width: 1366px) {
  .search-row {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 12px;
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .search-row {
    max-width: 100%;
    gap: 12px;
  }

  .filters-row {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .filter-group {
    width: 100%;
  }
}
</style>