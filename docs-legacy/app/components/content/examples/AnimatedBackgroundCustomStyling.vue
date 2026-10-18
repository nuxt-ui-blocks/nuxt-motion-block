<template>
  <MAnimatedBackground
    background-class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg -z-1 p-1"
    :transition="{ duration: 500, ease: 'ease-in-out' }"
  >
    <!-- Using custom tab implementation with data-id attributes -->
    <div class="flex space-x-4 p-2 rounded-full bg-transparent">
      <UButton
        v-for="(item, index) in tabItems"
        :key="index"
        :data-id="item.id"
        :color="activeTab === index ? 'primary' : 'gray'"
        variant="soft"
        size="md"
        class="px-6 py-3 font-medium transition-colors rounded-full"
        :class="activeTab === index ? 'text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'"
        @click="activeTab = index"
      >
        {{ item.label }}
      </UButton>
    </div>

    <!-- Tab content -->
    <div class="mt-4 p-4">
      <p>{{ tabItems[activeTab].content }}</p>
    </div>
  </MAnimatedBackground>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref(0)

const tabItems = [
  {
    label: 'Tab 1',
    content: 'Content for Tab 1',
    id: 'tab1',
  },
  {
    label: 'Tab 2',
    content: 'Content for Tab 2',
    id: 'tab2',
  },
  {
    label: 'Tab 3',
    content: 'Content for Tab 3',
    id: 'tab3',
  },
]
</script>
