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

const createModel = (propName) =>
  computed({
    get: () => props[propName],
    set: (value) => emit(`update:${propName}`, value),
  })

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
                v-for="category in props.categories"
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