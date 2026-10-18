<template>
  <div class="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl max-w-4xl mx-auto">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Dashboard Navigation
      </h2>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Interactive navigation system with animated background effects that respond to user interactions for enhanced engagement
      </p>
    </div>

    <MAnimatedBackground
      class="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      background-class="bg-blue-500 rounded-lg -z-1"
    >
      <div class="p-2 bg-gray-50 dark:bg-gray-700/50">
        <!-- Using NavigationMenu with custom slot to add data-id attributes -->
        <UNavigationMenu
          :items="navbarItems"
          class="flex flex-wrap gap-2 bg-transparent"
        >
          <template #item="{ item }">
            <ULink
              :to="item.to"
              :data-id="item.id"
              class="px-5 py-3 bg-white dark:bg-gray-800 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-600 flex items-center gap-3 transition-all duration-200 text-muted hover:text-highlighted"
            >
              {{ item.label }}
            </ULink>
          </template>
        </UNavigationMenu>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <UCard class="hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 dark:text-gray-400 text-sm">
                  Total Revenue
                </p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">
                  $45,231
                </p>
              </div>
              <div class="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <UIcon
                  name="i-lucide-trending-up"
                  class="w-6 h-6 text-green-600 dark:text-green-400"
                />
              </div>
            </div>
          </UCard>

          <UCard class="hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 dark:text-gray-400 text-sm">
                  Active Users
                </p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">
                  12,458
                </p>
              </div>
              <div class="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <UIcon
                  name="i-lucide-users"
                  class="w-6 h-6 text-blue-600 dark:text-blue-400"
                />
              </div>
            </div>
          </UCard>

          <UCard class="hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 dark:text-gray-400 text-sm">
                  Conversion Rate
                </p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">
                  24.8%
                </p>
              </div>
              <div class="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <UIcon
                  name="i-lucide-percent"
                  class="w-6 h-6 text-purple-600 dark:text-purple-400"
                />
              </div>
            </div>
          </UCard>
        </div>

        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h3>
          <UButton
            color="primary"
            variant="ghost"
            size="sm"
          >
            View All
          </UButton>
        </div>

        <div class="space-y-3">
          <div class="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
            <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
              <UIcon
                name="i-lucide-shopping-cart"
                class="w-5 h-5 text-blue-600 dark:text-blue-400"
              />
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900 dark:text-white">
                New order received
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                2 minutes ago
              </p>
            </div>
            <UButton
              color="primary"
              variant="ghost"
              size="sm"
            >
              View
            </UButton>
          </div>

          <div class="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
            <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
              <UIcon
                name="i-lucide-user-plus"
                class="w-5 h-5 text-green-600 dark:text-green-400"
              />
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900 dark:text-white">
                New user registered
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                15 minutes ago
              </p>
            </div>
            <UButton
              color="primary"
              variant="ghost"
              size="sm"
            >
              View
            </UButton>
          </div>
        </div>
      </div>
    </MAnimatedBackground>

    <div class="mt-6 text-center">
      <p class="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
        <UIcon
          name="i-lucide-mouse-pointer"
          class="w-4 h-4"
        />
        Hover over navigation items to see the animated background effect
      </p>
    </div>
  </div>
</template>

<script setup>
const navbarItems = [
  {
    label: 'Overview',
    to: '#',
    id: 'overview',
  },
  {
    label: 'Analytics',
    to: '#',
    id: 'analytics',
  },
  {
    label: 'Reports',
    to: '#',
    id: 'reports',
  },
  {
    label: 'Users',
    to: '#',
    id: 'users',
  },
  {
    label: 'Settings',
    to: '#',
    id: 'settings',
  },
]
</script>
