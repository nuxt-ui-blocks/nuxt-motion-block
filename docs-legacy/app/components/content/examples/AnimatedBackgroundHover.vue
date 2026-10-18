<template>
  <MAnimatedBackground
    enable-hover
    background-class="bg-emerald-500 rounded-lg shadow-lg -z-1"
  >
    <!-- Using NavigationMenu with custom slot to add data-id attributes -->
    <UNavigationMenu
      :items="navbarItems"
      class="flex space-x-3 bg-transparent"
    >
      <template #item="{ item }">
        <ULink
          :to="item.to"
          :data-id="item.id"
          class="px-4 py-2 cursor-pointer rounded transition-colors text-muted hover:text-highlighted hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {{ item.label }}
        </ULink>
      </template>
    </UNavigationMenu>
  </MAnimatedBackground>
</template>

<script setup>
const navbarItems = [
  {
    label: 'Navigation 1',
    to: '#',
    id: 'nav1',
  },
  {
    label: 'Navigation 2',
    to: '#',
    id: 'nav2',
  },
  {
    label: 'Navigation 3',
    to: '#',
    id: 'nav3',
  },
]
</script>
