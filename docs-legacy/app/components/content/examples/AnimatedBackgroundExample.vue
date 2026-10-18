<template>
  <div class="p-4">
    <MAnimatedBackground
      :transition="{ duration: 300 }"
      background-class="bg-blue-500 rounded-lg -z-1"
    >
      <!-- Using NavigationMenu with custom slot to add data-id attributes -->
      <UNavigationMenu
        :items="navbarItems"
        class="bg-transparent"
      >
        <template #item="{ item }">
          <ULink
            :to="item.to"
            :data-id="item.id"
            class="px-4 py-2 rounded-md text-muted hover:text-highlighted transition-colors"
          >
            {{ item.label }}
          </ULink>
        </template>
      </UNavigationMenu>
    </MAnimatedBackground>
  </div>
</template>

<script setup>
const navbarItems = [
  {
    label: 'Home',
    to: '#',
    id: 'home',
  },
  {
    label: 'About',
    to: '#',
    id: 'about',
  },
  {
    label: 'Contact',
    to: '#',
    id: 'contact',
  },
]
</script>
