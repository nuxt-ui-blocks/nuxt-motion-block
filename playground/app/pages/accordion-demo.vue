<template>
  <div class="min-h-screen bg-default p-8">
    <UCard class="mb-8">
      <template #header>
        <h1 class="text-2xl font-bold">
          MAccordion Demo
        </h1>
      </template>

      <div class="space-y-8">
        <!-- Single Mode -->
        <div>
          <h2 class="text-lg font-semibold mb-4">
            Single Mode (only one open at a time)
          </h2>
          <MAccordion
            v-model="singleValue"
            :items="singleItems"
          />
          <p class="text-sm text-muted mt-2">
            Current value: {{ singleValue }}
          </p>
        </div>

        <!-- Custom trigger -->
        <div>
          <h2 class="text-lg font-semibold mb-4">
            Custom trigger via the default slot
          </h2>
          <MAccordion
            v-model="singleValue"
            :items="singleItems"
          >
            <template #default="{ open, item }">
              <div class="flex items-center justify-between w-full py-3 px-4 text-left font-medium">
                <span>{{ item.label }}</span>
                <UIcon
                  :name="open ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                  class="w-5 h-5 transition-transform"
                />
              </div>
            </template>
          </MAccordion>
          <p class="text-sm text-muted mt-2">
            Current value: {{ singleValue }}
          </p>
        </div>

        <!-- Multiple Mode -->
        <div>
          <h2 class="text-lg font-semibold mb-4">
            Multiple Mode (several open at once)
          </h2>
          <MAccordion
            v-model="multipleValue"
            type="multiple"
            :items="multipleItems"
          />
          <p class="text-sm text-muted mt-2">
            Current value: {{ multipleValue }}
          </p>
        </div>

        <!-- Default Open -->
        <div>
          <h2 class="text-lg font-semibold mb-4">
            Default Open (uncontrolled)
          </h2>
          <MAccordion
            default-value="item-1"
            :items="singleItems"
          />
          <p class="text-sm text-muted mt-2">
            Starts open with <code>default-value="item-1"</code> and manages its own state.
          </p>
        </div>
      </div>

      <template #footer>
        <p class="text-sm text-muted">
          Component: MAccordion (composes Nuxt UI's UAccordion)
        </p>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const singleValue = ref<string | string[]>('item-1')
const multipleValue = ref<string | string[]>(['color-1'])

const singleItems = [
  {
    label: 'What is Nuxt Motion Block?',
    value: 'item-1',
    content: 'Nuxt Motion Block is a Vue/Nuxt component library providing animated UI primitives built on motion-v. It offers 60+ ready-made animated components for building modern web applications.',
  },
  {
    label: 'How do I install it?',
    value: 'item-2',
    content: 'Install via npm: npm install nuxt-motion-block. Then add the module to your nuxt.config.ts modules array.',
  },
  {
    label: 'What animations are supported?',
    value: 'item-3',
    content: 'All animations are powered by motion-v and support spring physics, easing curves, stagger effects, scroll-linked animations, layout animations, and gesture-based interactions.',
  },
]

const multipleItems = [
  {
    label: 'Red',
    value: 'color-1',
    content: 'Red is a warm color often associated with passion, energy, and excitement. It\'s commonly used for CTAs and important alerts.',
  },
  {
    label: 'Blue',
    value: 'color-2',
    content: 'Blue is a cool color associated with trust, calm, and professionalism. It\'s the most popular color for corporate and tech brands.',
  },
  {
    label: 'Green',
    value: 'color-3',
    content: 'Green represents nature, growth, and harmony. It\'s often used for success states, environmental themes, and health-related content.',
  },
]
</script>
