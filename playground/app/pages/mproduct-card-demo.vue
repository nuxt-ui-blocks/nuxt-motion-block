<template>
  <div class="space-y-12">
    <UPageHeader
      title="ProductCard"
      description="Commerce card with viewport entrance, hover zoom, wishlist heart, star rating and an animated add-to-cart."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Reference parity
        </p>
      </template>

      <!-- Two columns, a "Sale" card with a discount and a half star, a "New"
           card without one, and live callback logging. -->
      <div class="mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
        <MProductCard
          v-for="product in products"
          :key="product.title"
          v-bind="product"
          @add-to-cart="log('add-to-cart', product.title)"
          @wishlist="log('wishlist', product.title)"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Rating boundaries
        </p>
      </template>
      <p class="mb-4 text-sm text-muted">
        The star algorithm floors, then rounds a fraction <code>&gt;= 0.75</code> up and renders
        <code>0.25 &ndash; 0.75</code> as a half star. These four cover every branch.
      </p>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MProductCard
          v-for="product in ratingCases"
          :key="product.title"
          v-bind="product"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          State
        </p>
      </template>
      <div class="max-w-xs">
        <MProductCard
          image="https://picsum.photos/seed/plain/600/600"
          title="Plain card, no extras"
          :price="89"
        />
      </div>
    </UCard>

    <UCard v-if="events.length">
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Events
        </p>
      </template>
      <ul class="space-y-1 text-sm font-mono text-muted">
        <li
          v-for="(event, index) in events"
          :key="index"
        >
          {{ event }}
        </li>
      </ul>
    </UCard>
  </div>
</template>

<script setup lang="ts">
interface Product {
  badge?: string
  currency?: string
  image: string
  originalPrice?: number
  price: number
  rating?: number
  title: string
}

const products: Product[] = [
  {
    badge: 'Sale',
    image: 'https://picsum.photos/seed/prod1/600/600',
    originalPrice: 179,
    price: 129,
    rating: 4.5,
    title: 'Sneaker',
  },
  {
    badge: 'New',
    image: 'https://picsum.photos/seed/prod2/600/600',
    price: 89,
    rating: 5,
    title: 'Headphones',
  },
]

// 3.1 -> no half (0.1 is below 0.25) and no round-up. 3.5 -> half star. 3.8 -> rounds up to 4. 4 -> plain.
const ratingCases: Product[] = [
  { image: 'https://picsum.photos/seed/r1/600/600', price: 10, rating: 3.1, title: 'Rating 3.1' },
  { image: 'https://picsum.photos/seed/r2/600/600', price: 20, rating: 3.5, title: 'Rating 3.5 (half)' },
  { image: 'https://picsum.photos/seed/r3/600/600', price: 30, rating: 3.8, title: 'Rating 3.8 (rounds up)' },
  { image: 'https://picsum.photos/seed/r4/600/600', price: 40, rating: 4, title: 'Rating 4' },
]

const events = ref<string[]>([])

function log(kind: string, title: string) {
  events.value = [`${kind}: ${title}`, ...events.value].slice(0, 8)
}
</script>
