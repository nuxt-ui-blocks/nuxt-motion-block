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
            :expanded-value="singleValue"
            @value-change="singleValue = $event"
          >
            <MAccordionItem value="item-1">
              <MAccordionTrigger class="w-full">
                <template #default="{ expanded }">
                  <div class="flex items-center justify-between w-full py-3 px-4 text-left font-medium">
                    <span>What is Nuxt Motion Block?</span>
                    <UIcon
                      :name="expanded ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                      class="w-5 h-5 transition-transform"
                    />
                  </div>
                </template>
              </MAccordionTrigger>
              <MAccordionContent>
                <div class="px-4 pb-4 text-muted">
                  <p>Nuxt Motion Block is a Vue/Nuxt component library providing animated UI primitives built on motion-v. It offers 60+ ready-made animated components for building modern web applications.</p>
                </div>
              </MAccordionContent>
            </MAccordionItem>

            <MAccordionItem value="item-2">
              <MAccordionTrigger class="w-full">
                <template #default="{ expanded }">
                  <div class="flex items-center justify-between w-full py-3 px-4 text-left font-medium">
                    <span>How do I install it?</span>
                    <UIcon
                      :name="expanded ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                      class="w-5 h-5 transition-transform"
                    />
                  </div>
                </template>
              </MAccordionTrigger>
              <MAccordionContent>
                <div class="px-4 pb-4 text-muted">
                  <p>Install via npm: npm install nuxt-motion-block. Then add the module to your nuxt.config.ts modules array.</p>
                </div>
              </MAccordionContent>
            </MAccordionItem>

            <MAccordionItem value="item-3">
              <MAccordionTrigger class="w-full">
                <template #default="{ expanded }">
                  <div class="flex items-center justify-between w-full py-3 px-4 text-left font-medium">
                    <span>What animations are supported?</span>
                    <UIcon
                      :name="expanded ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                      class="w-5 h-5 transition-transform"
                    />
                  </div>
                </template>
              </MAccordionTrigger>
              <MAccordionContent>
                <div class="px-4 pb-4 text-muted">
                  <p>All animations are powered by motion-v and support spring physics, easing curves, stagger effects, scroll-linked animations, layout animations, and gesture-based interactions.</p>
                </div>
              </MAccordionContent>
            </MAccordionItem>
          </MAccordion>
          <p class="text-sm text-muted mt-2">
            Current value: {{ singleValue }}
          </p>
        </div>

        <!-- Item-driven -->
        <div>
          <h2 class="text-lg font-semibold mb-4">
            Item-driven (value bound to the data)
          </h2>
          <MAccordion
            :expanded-value="multipleValue"
            @value-change="multipleValue = $event"
          >
            <MAccordionItem
              v-for="item in multipleItems"
              :key="item.value"
              :value="item.value"
            >
              <MAccordionTrigger class="w-full">
                <template #default="{ expanded }">
                  <div class="flex items-center justify-between w-full py-3 px-4 text-left font-medium">
                    <span>{{ item.label }}</span>
                    <UIcon
                      :name="expanded ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                      class="w-5 h-5 transition-transform"
                    />
                  </div>
                </template>
              </MAccordionTrigger>
              <MAccordionContent>
                <div class="px-4 pb-4 text-muted">
                  <p>{{ item.content }}</p>
                </div>
              </MAccordionContent>
            </MAccordionItem>
          </MAccordion>
          <p class="text-sm text-muted mt-2">
            Current value: {{ multipleValue }}
          </p>
        </div>

        <!-- Default Open -->
        <div>
          <h2 class="text-lg font-semibold mb-4">
            Default Open
          </h2>
          <MAccordion expanded-value="default-1">
            <MAccordionItem value="default-1">
              <MAccordionTrigger class="w-full">
                <template #default="{ expanded }">
                  <div class="flex items-center justify-between w-full py-3 px-4 text-left font-medium">
                    <span>This one starts open</span>
                    <UIcon
                      :name="expanded ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                      class="w-5 h-5 transition-transform"
                    />
                  </div>
                </template>
              </MAccordionTrigger>
              <MAccordionContent>
                <div class="px-4 pb-4 text-muted">
                  <p>This accordion item has its content visible by default using the expandedValue prop.</p>
                </div>
              </MAccordionContent>
            </MAccordionItem>

            <MAccordionItem value="default-2">
              <MAccordionTrigger class="w-full">
                <template #default="{ expanded }">
                  <div class="flex items-center justify-between w-full py-3 px-4 text-left font-medium">
                    <span>This one starts closed</span>
                    <UIcon
                      :name="expanded ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                      class="w-5 h-5 transition-transform"
                    />
                  </div>
                </template>
              </MAccordionTrigger>
              <MAccordionContent>
                <div class="px-4 pb-4 text-muted">
                  <p>This accordion item starts collapsed and can be expanded by clicking the trigger.</p>
                </div>
              </MAccordionContent>
            </MAccordionItem>
          </MAccordion>
        </div>
      </div>

      <template #footer>
        <p class="text-sm text-muted">
          Component: MAccordion (compound components with motion-v)
        </p>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const singleValue = ref<string | number | null>('item-1')
const multipleValue = ref<string | number | null>('color-1')

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
