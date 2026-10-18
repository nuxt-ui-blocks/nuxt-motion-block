---
title: Product Grid
description: A responsive product grid with animated cards, filtering options, and interactive elements.
navigation:
  icon: i-heroicons-shopping-bag
---

# Product Grid

A responsive product grid with animated cards, filtering options, and interactive elements. Perfect for e-commerce websites and product catalogs.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ProductGridExample" />
  :::
#code
```vue
<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Our Products</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Discover our latest collection</p>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-4 mb-8">
      <div class="flex-1">
        <UInput
          v-model="searchQuery"
          placeholder="Search products..."
          icon="i-heroicons-magnifying-glass"
          size="lg"
        />
      </div>
      <div class="flex gap-3">
        <USelectMenu
          v-model="categoryFilter"
          :options="categories"
          placeholder="Category"
          size="lg"
        />
        <USelectMenu
          v-model="sortOption"
          :options="sortOptions"
          placeholder="Sort by"
          size="lg"
        />
      </div>
    </div>

    <!-- Product Grid -->
    <MAnimatedGroup
      :stagger-children="0.1"
      preset="slide"
      initial="hidden"
      animate="visible"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
      >
        <UCard
          class="h-full flex flex-col group hover:shadow-lg transition-shadow duration-300"
          :ui="{ body: { base: 'flex-1 flex flex-col' } }"
        >
          <!-- Product Image -->
          <div class="relative overflow-hidden rounded-t-lg">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
            >
            <div class="absolute top-3 right-3">
              <UButton
                :icon="product.isFavorite ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
                :color="product.isFavorite ? 'red' : 'white'"
                variant="solid"
                size="sm"
                square
                @click="toggleFavorite(product.id)"
              />
            </div>
            <div v-if="product.badge" class="absolute top-3 left-3">
              <UBadge
                :color="product.badge.color"
                variant="solid"
              >
                {{ product.badge.text }}
              </UBadge>
            </div>
          </div>

          <!-- Product Info -->
          <div class="flex-1 flex flex-col p-4">
            <div class="flex-1">
              <h3 class="font-semibold text-lg text-gray-900 dark:text-white">{{ product.name }}</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">{{ product.category }}</p>
              <p class="text-gray-700 dark:text-gray-300 mt-2 text-sm line-clamp-2">{{ product.description }}</p>
            </div>

            <div class="mt-4 flex items-center justify-between">
              <div>
                <p class="text-lg font-bold text-gray-900 dark:text-white">${{ product.price }}</p>
                <div v-if="product.originalPrice" class="flex items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400 line-through">${{ product.originalPrice }}</span>
                  <span class="text-sm text-red-500 ml-2">-{{ product.discount }}%</span>
                </div>
              </div>
              <div class="flex items-center">
                <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-amber-400" />
                <span class="text-sm text-gray-600 dark:text-gray-400 ml-1">{{ product.rating }}</span>
              </div>
            </div>

            <div class="mt-4 flex gap-2">
              <UButton
                color="primary"
                variant="solid"
                class="flex-1"
                @click="addToCart(product)"
              >
                Add to Cart
              </UButton>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-eye"
                square
                @click="viewProduct(product)"
              />
            </div>
          </div>
        </UCard>
      </div>
    </MAnimatedGroup>

    <!-- Empty State -->
    <div
      v-if="filteredProducts.length === 0"
      class="text-center py-12"
    >
      <UIcon
        name="i-heroicons-shopping-bag"
        class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500"
      />
      <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">No products found</h3>
      <p class="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
      <UButton
        class="mt-6"
        @click="resetFilters"
      >
        Reset Filters
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const categoryFilter = ref('')
const sortOption = ref('')

const categories = [
  { label: 'All Categories', value: '' },
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Clothing', value: 'Clothing' },
  { label: 'Home & Garden', value: 'Home & Garden' },
  { label: 'Sports', value: 'Sports' },
  { label: 'Books', value: 'Books' }
]

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Customer Rating', value: 'rating' },
  { label: 'Newest', value: 'newest' }
]

const products = ref([
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling headphones with 30-hour battery life and deep bass.',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviews: 124,
    isFavorite: false,
    badge: { text: 'Sale', color: 'red' }
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    description: 'Track your heart rate, sleep, and daily activity with this advanced smartwatch.',
    price: 149.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    reviews: 89,
    isFavorite: true,
    badge: null
  },
  {
    id: 3,
    name: 'Cotton T-Shirt',
    description: 'Comfortable and breathable cotton t-shirt available in multiple colors.',
    price: 24.99,
    originalPrice: 29.99,
    discount: 17,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    rating: 4.3,
    reviews: 56,
    isFavorite: false,
    badge: { text: 'New', color: 'green' }
  },
  {
    id: 4,
    name: 'Stainless Steel Water Bottle',
    description: 'Keep your drinks hot or cold for hours with this insulated water bottle.',
    price: 29.99,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    reviews: 203,
    isFavorite: false,
    badge: null
  },
  {
    id: 5,
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with carrying strap for all your fitness needs.',
    price: 39.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    reviews: 78,
    isFavorite: true,
    badge: { text: 'Eco', color: 'emerald' }
  },
  {
    id: 6,
    name: 'Bestselling Novel',
    description: 'Award-winning novel that has captivated readers worldwide.',
    price: 14.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviews: 312,
    isFavorite: false,
    badge: null
  },
  {
    id: 7,
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 34.99,
    originalPrice: 39.99,
    discount: 13,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1606220588911-4a8f7a0d0b8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    rating: 4.4,
    reviews: 67,
    isFavorite: false,
    badge: { text: 'Sale', color: 'red' }
  },
  {
    id: 8,
    name: 'Designer Sunglasses',
    description: 'Stylish sunglasses with UV protection and polarized lenses.',
    price: 89.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    reviews: 92,
    isFavorite: false,
    badge: null
  }
])

const filteredProducts = computed(() => {
  let result = [...products.value]
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
  }
  
  // Apply category filter
  if (categoryFilter.value) {
    result = result.filter(product => product.category === categoryFilter.value)
  }
  
  // Apply sorting
  switch (sortOption.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      result.sort((a, b) => b.id - a.id)
      break
    default:
      // Featured - keep original order
      break
  }
  
  return result
})

const toggleFavorite = (productId: number) => {
  const product = products.value.find(p => p.id === productId)
  if (product) {
    product.isFavorite = !product.isFavorite
  }
}

const addToCart = (product: any) => {
  // In a real app, this would add to cart state
  console.log('Added to cart:', product.name)
  // Show notification
  useToast().add({
    title: 'Added to cart',
    description: `${product.name} has been added to your cart`,
    icon: 'i-heroicons-shopping-cart',
    timeout: 3000
  })
}

const viewProduct = (product: any) => {
  // In a real app, this would navigate to product detail page
  console.log('View product:', product.name)
}

const resetFilters = () => {
  searchQuery.value = ''
  categoryFilter.value = ''
  sortOption.value = ''
}
</script>
```
::