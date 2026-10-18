<template>
  <UHeader
    title="MotionBlocks"
    class="sticky top-0 z-50 bg-white dark:bg-gray-900 rounded-full border-b border-gray-200 dark:border-gray-800"
  >
    <!-- Desktop Navigation -->
    <div class="hidden md:flex">
      <MAnimatedBackground
        :transition="{ duration: 300 }"
        background-class="bg-neutral-200 dark:bg-neutral-800 rounded-lg -z-1"
        enable-hover
        container-class="w-full"
      >
        <UNavigationMenu
          :items="navigationItems"
          class="bg-transparent w-full"
          variant="link"
          color="neutral"
        >
          <template #item="{ item }">
            <ULink
              v-bind="item"
              :data-id="item.id"
              class="px-3 py-2 rounded-md text-muted hover:text-highlighted transition-colors"
            >
              {{ item.label }}
            </ULink>
          </template>
          <template #item-child="{ item }">
            <ULink
              v-bind="item"
              :data-id="item.id"
              class="px-3 py-2 rounded-md text-muted hover:text-highlighted transition-colors"
            >
              {{ item.label }}
            </ULink>
          </template>
        </UNavigationMenu>
      </MAnimatedBackground>
    </div>

    <!-- Right side controls -->
    <template #right>
      <!-- Search Button -->
      <UButton
        icon="i-heroicons-magnifying-glass"
        variant="ghost"
        color="neutral"
        size="sm"
        square
      />

      <!-- Color Mode Toggle -->
      <UColorModeButton
        variant="ghost"
        color="neutral"
        size="sm"
      />

      <!-- User Profile Dropdown -->
      <UDropdownMenu
        :items="userMenuItems"
        :ui="{ item: { base: 'gap-x-2' } }"
      >
        <UButton
          variant="ghost"
          color="neutral"
          size="sm"
        >
          <UAvatar
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="User"
            size="xs"
          />
          <span class="hidden lg:inline ml-2">John Doe</span>
        </UButton>
      </UDropdownMenu>
    </template>

    <!-- Mobile menu content -->
    <template #body>
      <div class="p-4 space-y-4">
        <UNavigationMenu
          :items="navigationItems"
          orientation="vertical"
          class="w-full"
        />

        <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
          <UButton
            to="#"
            variant="ghost"
            color="neutral"
            size="sm"
          >
            Sign in
          </UButton>
          <UButton
            to="#"
            variant="solid"
            color="primary"
            size="sm"
          >
            Sign up
          </UButton>
        </div>
      </div>
    </template>
  </UHeader>
</template>

<script setup>
const navigationItems = [
  {
    label: 'Products',
    id: 'products',
    children: [
      {
        label: 'UI Components',
        id: 'ui-components',
        description: 'Beautiful animated components',
        to: '#',
      },
      {
        label: 'Templates',
        id: 'templates',
        description: 'Pre-built website templates',
        to: '#',
      },
      {
        label: 'Icons',
        id: 'icons',
        description: 'Animated icon library',
        to: '#',
      },
    ],
  },
  {
    label: 'Solutions',
    id: 'solutions',
    children: [
      {
        label: 'For Developers',
        id: 'for-developers',
        description: 'Tools and components for developers',
        to: '#',
      },
      {
        label: 'For Designers',
        id: 'for-designers',
        description: 'Design systems and UI kits',
        to: '#',
      },
      {
        label: 'For Teams',
        id: 'for-teams',
        description: 'Collaboration and workflow tools',
        to: '#',
      },
    ],
  },
  {
    label: 'Resources',
    id: 'resources',
    children: [
      {
        label: 'Documentation',
        id: 'documentation',
        to: '#',
      },
      {
        label: 'Tutorials',
        id: 'tutorials',
        to: '#',
      },
      {
        label: 'Blog',
        id: 'blog',
        to: '#',
      },
      {
        label: 'Community',
        id: 'community',
        to: '#',
      },
    ],
  },
  {
    label: 'Pricing',
    id: 'pricing',
    to: '#',
  },
]

const userMenuItems = [
  [
    {
      label: 'Dashboard',
      icon: 'i-heroicons-chart-bar',
      to: '#',
    },
    {
      label: 'Profile',
      icon: 'i-heroicons-user',
      to: '#',
    },
    {
      label: 'Settings',
      icon: 'i-heroicons-cog-6-tooth',
      to: '#',
    },
    {
      label: 'Billing',
      icon: 'i-heroicons-credit-card',
      to: '#',
    },
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      to: '#',
    },
  ],
]
</script>
