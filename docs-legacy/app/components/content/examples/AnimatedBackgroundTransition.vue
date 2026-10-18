<template>
  <MAnimatedBackground
    background-class="-z-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1"
    :transition="{ duration: 500, ease: 'ease-in-out' }"
    enable-hover
  >
    <!-- Using UCard with data-id attributes for hover tracking -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard
        v-for="(item, index) in ITEMS"
        :key="index"
        :data-id="`card-${index}`"
        class="hover:shadow-md transition-shadow cursor-pointer bg-transparent"
      >
        <div class="flex select-none flex-col gap-2 p-4">
          <h3 class="text-base font-medium text-zinc-800 dark:text-zinc-50">
            {{ item.title }}
          </h3>
          <p class="text-base text-zinc-600 dark:text-zinc-400">
            {{ item.description }}
          </p>
        </div>
      </UCard>
    </div>

    <!-- Using custom tab implementation with data-id attributes -->
    <div class="mt-6">
      <div class="mt-4 rounded-lg p-1 bg-zinc-100 dark:bg-zinc-800">
        <div class="flex gap-1">
          <UButton
            v-for="(item, index) in tabItems"
            :key="index"
            :data-id="item.id"
            :color="activeTab === index ? 'primary' : undefined"
            variant="soft"
            size="sm"
            class="px-4 py-2 font-medium transition-colors rounded-md"
            :class="activeTab === index ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'"
            @click="activeTab = index"
          >
            {{ item.label }}
          </UButton>
        </div>
      </div>

      <!-- Tab content -->
      <div class="mt-4 p-4 bg-white dark:bg-zinc-700 rounded-md shadow">
        <p>{{ getTabContent() }}</p>
      </div>
    </div>
  </MAnimatedBackground>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0)

const ITEMS = [
  {
    id: 1,
    title: 'Dialog',
    description: 'Enhances modal presentations.',
  },
  {
    id: 2,
    title: 'Popover',
    description: 'For small interactive overlays.',
  },
  {
    id: 3,
    title: 'Accordion',
    description: 'Collapsible sections for more content.',
  },
  {
    id: 4,
    title: 'Collapsible',
    description: 'Collapsible sections for more content.',
  },
  {
    id: 5,
    title: 'Drag to Reorder',
    description: 'Reorder items with drag and drop.',
  },
  {
    id: 6,
    title: 'Swipe to Delete',
    description: 'Delete items with swipe gestures.',
  },
]

const tabItems = [
  {
    label: 'Overview',
    content: 'Overview content',
    id: 'overview',
  },
  {
    label: 'Settings',
    content: 'Settings content',
    id: 'settings',
  },
  {
    label: 'Advanced',
    content: 'Advanced content',
    id: 'advanced',
  },
]

function getTabContent() {
  const item = tabItems[activeTab.value]
  if (item && typeof item === 'object' && 'content' in item && item.content) {
    return item.content
  }
  return ''
}
</script>
