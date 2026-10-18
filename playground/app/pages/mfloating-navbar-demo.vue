<template>
  <div class="min-h-screen bg-default">
    <UCard class="m-8">
      <template #header>
        <h1 class="text-2xl font-bold">
          FloatingNavbar Demo
        </h1>
      </template>

      <div class="space-y-4">
        <p class="text-muted-foreground">
          Scroll down to see the floating navbar appear. It slides up when scrolling down and slides down when scrolling up.
        </p>
      </div>

      <template #footer>
        <p class="text-sm text-muted">
          Component: FloatingNavbar (UHeader + motion-v useScroll)
        </p>
      </template>
    </UCard>

    <MFloatingNavbar
      brand="MotionBlock"
      :links="navLinks"
    >
      <template #right>
        <UButton
          size="xs"
          color="primary"
          variant="solid"
        >
          Get Started
        </UButton>
      </template>
    </MFloatingNavbar>

    <!-- Spacer content for scrolling -->
    <div class="max-w-2xl mx-auto px-8 py-16 space-y-16">
      <div
        v-for="section in 8"
        :key="section"
        class="space-y-4"
      >
        <UCard>
          <h2 class="text-xl font-semibold mb-2">
            Section {{ section }}
          </h2>
          <p class="text-muted-foreground leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p class="text-muted-foreground leading-relaxed mt-2">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
            voluptatem accusantium doloremque laudantium, totam rem aperiam.
          </p>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Docs', to: '/docs' },
]
</script>
