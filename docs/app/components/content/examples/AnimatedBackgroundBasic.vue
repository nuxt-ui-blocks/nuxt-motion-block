<template>
  <div class="w-full max-w-md">
    <MAnimatedBackground
      :default-value="tabs[0].id"
      :transition="{ duration: 250, ease: 'ease-out' }"
      background-class="bg-primary rounded-lg"
      class="flex items-center gap-1 rounded-xl border border-default bg-elevated p-1"
      @value-change="active = $event"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :data-id="tab.id"
        type="button"
        class="relative z-1 flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
        :class="active === tab.id ? 'text-inverted' : 'text-muted hover:text-highlighted'"
      >
        <UIcon
          :name="tab.icon"
          class="size-4"
        />
        {{ tab.label }}
      </button>
    </MAnimatedBackground>

    <div class="mt-4 rounded-xl border border-default bg-elevated p-6">
      <div class="flex items-center gap-3">
        <div class="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <UIcon
            :name="current.icon"
            class="size-5"
          />
        </div>
        <div>
          <p class="font-medium text-highlighted">
            {{ current.label }}
          </p>
          <p class="text-sm text-muted">
            {{ current.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const tabs = [
  { id: 'overview', label: 'Overview', icon: 'i-lucide-layout-dashboard', description: 'A snapshot of your workspace.' },
  { id: 'analytics', label: 'Analytics', icon: 'i-lucide-chart-line', description: 'Traffic, conversions, and trends.' },
  { id: 'reports', label: 'Reports', icon: 'i-lucide-file-text', description: 'Download or schedule exports.' },
  { id: 'settings', label: 'Settings', icon: 'i-lucide-settings', description: 'Manage your preferences.' },
]

const active = ref(tabs[0].id)
const current = computed(() => tabs.find(tab => tab.id === active.value) ?? tabs[0])
</script>
