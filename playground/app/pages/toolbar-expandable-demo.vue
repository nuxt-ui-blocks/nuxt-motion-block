<template>
  <div class="min-h-screen bg-default p-8">
    <UCard class="mb-8">
      <template #header>
        <h1 class="text-2xl font-bold">
          MToolbarExpandable Demo
        </h1>
      </template>

      <div class="space-y-12">
        <div>
          <h2 class="text-lg font-semibold mb-4">
            Expandable Toolbar
          </h2>
          <div class="h-80 flex items-end justify-center bg-muted/30 rounded-xl p-8">
            <MToolbarExpandable
              :items="toolbarItems"
              @select="handleSelect"
            >
              <template #item-icon="{ item, isActive }">
                <UIcon
                  :name="item.icon"
                  class="w-5 h-5"
                  :class="isActive ? 'text-primary' : ''"
                />
              </template>
              <template #item-content="{ item }">
                <div>
                  <h3 class="font-bold text-lg">
                    {{ item.label }}
                  </h3>
                  <p class="text-muted text-sm mt-1">
                    Content for {{ item.label }} toolbar item.
                  </p>
                </div>
              </template>
            </MToolbarExpandable>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-4">
            Selected: {{ selectedItem || 'None' }}
          </h2>
        </div>
      </div>

      <template #footer>
        <p class="text-sm text-muted">
          Component: MToolbarExpandable
        </p>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const toolbarItems = [
  { id: 'home', label: 'Home', icon: 'i-lucide-home' },
  { id: 'search', label: 'Search', icon: 'i-lucide-search' },
  { id: 'settings', label: 'Settings', icon: 'i-lucide-settings' },
  { id: 'profile', label: 'Profile', icon: 'i-lucide-user' },
]

const selectedItem = ref<string | null>(null)

function handleSelect(item: { id: string, label: string }) {
  selectedItem.value = item.label
}
</script>
