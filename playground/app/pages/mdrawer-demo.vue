<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-highlighted mb-2">
      Drawer Demo
    </h1>
    <p class="text-muted mb-6">
      UDrawer extended with motion-v spring physics for overlay and content slide transitions.
    </p>

    <div class="space-y-8">
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Directions
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MDrawer
            direction="left"
            title="Left Drawer"
            description="Slides in from the left"
          >
            <UButton
              label="Left"
              color="primary"
            />
            <template #body>
              <div class="space-y-4">
                <p class="text-muted">
                  This drawer slides in from the left with spring physics.
                </p>
                <UInput placeholder="Search..." />
                <UButton
                  label="Action"
                  color="primary"
                />
              </div>
            </template>
          </MDrawer>

          <MDrawer
            direction="right"
            title="Right Drawer"
            description="Slides in from the right"
          >
            <UButton
              label="Right"
              color="secondary"
            />
            <template #body>
              <p class="text-muted">
                This drawer slides in from the right.
              </p>
            </template>
          </MDrawer>

          <MDrawer
            direction="top"
            title="Top Drawer"
            description="Slides down from top"
          >
            <UButton
              label="Top"
              color="info"
            />
            <template #body>
              <p class="text-muted">
                This drawer slides down from the top.
              </p>
            </template>
          </MDrawer>

          <MDrawer
            direction="bottom"
            title="Bottom Drawer"
            description="Slides up from bottom"
          >
            <UButton
              label="Bottom"
              color="warning"
            />
            <template #body>
              <p class="text-muted">
                This drawer slides up from the bottom.
              </p>
            </template>
          </MDrawer>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            With Form
          </h2>
        </template>
        <MDrawer
          title="Create Item"
          description="Fill in the details below"
          direction="right"
          :close="true"
        >
          <UButton
            label="Create New"
            color="primary"
            icon="i-lucide-plus"
          />
          <template #body>
            <form
              class="space-y-4"
              @submit.prevent
            >
              <UFormField label="Name">
                <UInput
                  placeholder="Enter name"
                  class="w-full"
                />
              </UFormField>
              <UFormField label="Email">
                <UInput
                  placeholder="Enter email"
                  class="w-full"
                />
              </UFormField>
              <UFormField label="Description">
                <UTextarea
                  placeholder="Enter description"
                  class="w-full"
                />
              </UFormField>
            </form>
          </template>
          <template #footer>
            <div class="flex gap-2">
              <UButton
                label="Cancel"
                color="neutral"
                variant="outline"
              />
              <UButton
                label="Save"
                color="primary"
              />
            </div>
          </template>
        </MDrawer>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Navigation Drawer
          </h2>
        </template>
        <MDrawer
          title="Navigation"
          direction="left"
          :close="true"
        >
          <UButton
            label="Open Menu"
            icon="i-lucide-menu"
            color="neutral"
            variant="outline"
          />
          <template #body>
            <nav class="space-y-1">
              <a
                v-for="item in navItems"
                :key="item.label"
                href="#"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors"
              >
                <UIcon
                  :name="item.icon"
                  class="w-5 h-5"
                />
                {{ item.label }}
              </a>
            </nav>
          </template>
        </MDrawer>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const navItems = [
  { label: 'Home', icon: 'i-lucide-home' },
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard' },
  { label: 'Projects', icon: 'i-lucide-folder' },
  { label: 'Team', icon: 'i-lucide-users' },
  { label: 'Settings', icon: 'i-lucide-settings' },
]
</script>
