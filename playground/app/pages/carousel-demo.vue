<template>
  <div class="min-h-screen bg-default p-8">
    <UCard class="mb-8">
      <template #header>
        <h1 class="text-2xl font-bold">
          MCarousel Demo
        </h1>
      </template>

      <div class="space-y-12">
        <div>
          <h2 class="text-lg font-semibold mb-4">
            Basic Carousel
          </h2>
          <MCarousel
            v-slot="{ item }"
            :items="basicItems"
            class="w-full max-w-lg"
          >
            <div class="flex items-center justify-center h-64 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white">
              <span class="text-4xl font-bold">{{ item }}</span>
            </div>
          </MCarousel>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-4">
            Autoplay + Loop Carousel
          </h2>
          <MCarousel
            v-slot="{ item }"
            :items="colorItems"
            loop
            arrows
            dots
            :autoplay="{ delay: 2000 }"
            class="w-full max-w-lg"
          >
            <div
              class="flex items-center justify-center h-64 rounded-xl"
              :class="item.bg"
            >
              <span
                class="text-4xl font-bold"
                :class="item.text"
              >{{ item.label }}</span>
            </div>
          </MCarousel>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-4">
            Loop with Arrows
          </h2>
          <MCarousel
            v-slot="{ item, index }"
            :items="numberItems"
            loop
            arrows
            prev-icon="i-lucide-arrow-left"
            next-icon="i-lucide-arrow-right"
            class="w-full max-w-lg"
          >
            <div class="flex items-center justify-center h-64 rounded-xl bg-muted">
              <span class="text-4xl font-bold">{{ index + 1 }}: {{ item }}</span>
            </div>
          </MCarousel>
        </div>
      </div>

      <template #footer>
        <p class="text-sm text-muted">
          Component: MCarousel (Nuxt UI Carousel built on Embla)
        </p>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const basicItems = Array.from({ length: 5 }, (_, i) => `Slide ${i + 1}`)

const colorItems = [
  { bg: 'bg-red-500', text: 'text-white', label: 'Red' },
  { bg: 'bg-blue-500', text: 'text-white', label: 'Blue' },
  { bg: 'bg-green-500', text: 'text-white', label: 'Green' },
  { bg: 'bg-yellow-500', text: 'text-black', label: 'Yellow' },
]

const numberItems = ['First', 'Second', 'Third']
</script>
