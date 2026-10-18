<template>
  <div class="space-y-12">
    <UPageHeader
      title="ExpandableNavbar"
      description="Expandable navigation with animated mobile menu. UHeader with stagger-animated links on mobile, UNavigationMenu for desktop."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic Navbar
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Click the hamburger icon on mobile to see stagger-animated menu items slide in from the left.
      </p>
      <MExpandableNavbar
        title="MotionBlock"
        :items="navItems"
      />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          With Icons
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Navigation items with leading icons for visual clarity.
      </p>
      <MExpandableNavbar
        title="MyApp"
        :items="navItemsWithIcons"
      />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          With Actions Slot
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Pass action buttons through the #actions slot.
      </p>
      <MExpandableNavbar
        title="Dashboard"
        :items="navItems"
      >
        <template #actions>
          <UButton
            label="Get Started"
            color="primary"
            size="sm"
          />
        </template>
      </MExpandableNavbar>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Many Items
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Navbar handles larger navigation sets gracefully.
      </p>
      <MExpandableNavbar
        title="Enterprise"
        :items="manyItems"
      />
    </UCard>
  </div>
</template>

<script setup lang="ts">
const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Docs', to: '/docs' },
]

const navItemsWithIcons = [
  { label: 'Home', to: '/', icon: 'i-lucide-home' },
  { label: 'Features', to: '/features', icon: 'i-lucide-zap' },
  { label: 'Pricing', to: '/pricing', icon: 'i-lucide-credit-card' },
  { label: 'Docs', to: '/docs', icon: 'i-lucide-book-open' },
]

const manyItems = [
  { label: 'Dashboard', to: '/dashboard', icon: 'i-lucide-layout-dashboard' },
  { label: 'Projects', to: '/projects', icon: 'i-lucide-folder' },
  { label: 'Team', to: '/team', icon: 'i-lucide-users' },
  { label: 'Analytics', to: '/analytics', icon: 'i-lucide-bar-chart-3' },
  { label: 'Settings', to: '/settings', icon: 'i-lucide-settings' },
  { label: 'Billing', to: '/billing', icon: 'i-lucide-credit-card' },
]
</script>
