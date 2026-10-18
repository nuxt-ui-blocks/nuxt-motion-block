<template>
  <div class="space-y-12">
    <UPageHeader
      title="DynamicIsland"
      description="Five-view activity island. Drive it uncontrolled, or with v-model:view, and swap the idle / ring / timer bodies through slots."
    />

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Controlled — <code>v-model:view</code>
        </p>
      </template>

      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-wrap items-center justify-center gap-2">
          <UButton
            v-for="key in VIEWS"
            :key="key"
            :variant="view === key ? 'solid' : 'outline'"
            size="sm"
            @click="view = key"
          >
            {{ key }}
          </UButton>
        </div>

        <p class="text-muted text-sm">
          <span class="font-mono">view</span> = <code data-demo-view>{{ view }}</code>
          · last
          <code>onViewChange</code> =
          <code data-demo-emitted>{{ lastEmitted }}</code>
        </p>

        <div class="flex w-full items-center justify-center rounded-lg bg-neutral-950 py-4 dark:bg-black">
          <MDynamicIsland
            v-model:view="view"
            :on-view-change="recordEmitted"
            data-demo-island
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Uncontrolled — internal state
        </p>
      </template>

      <div class="flex flex-col items-center gap-2">
        <p class="text-muted text-sm">
          No <code>view</code> and no <code>onViewChange</code>: use the island's own bottom switcher.
        </p>
        <div class="flex w-full items-center justify-center rounded-lg bg-neutral-950 py-4 dark:bg-black">
          <MDynamicIsland data-demo-island-uncontrolled />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Slot overrides
        </p>
      </template>

      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-wrap items-center justify-center gap-2">
          <UButton
            v-for="key in SLOT_VIEWS"
            :key="key"
            :variant="slotView === key ? 'solid' : 'outline'"
            size="sm"
            @click="slotView = key"
          >
            {{ key }} (custom)
          </UButton>
        </div>

        <div class="flex w-full items-center justify-center rounded-lg bg-neutral-950 py-4 dark:bg-black">
          <MDynamicIsland
            :view="slotView"
            data-demo-island-slots
          >
            <template #idle>
              <div class="flex items-center gap-2 px-3 py-2">
                <UIcon
                  name="i-lucide-sun"
                  class="h-5 w-5 text-amber-300"
                />
                <span class="font-medium text-sm text-white">Custom idle slot</span>
              </div>
            </template>

            <template #ring>
              <div class="flex w-64 items-center gap-3 overflow-hidden px-4 py-2">
                <UIcon
                  name="i-lucide-video"
                  class="h-5 w-5 text-sky-400"
                />
                <div class="flex-1">
                  <p class="pointer-events-none font-medium text-sm text-white">
                    Custom ring slot
                  </p>
                  <p class="pointer-events-none text-white text-xs opacity-70">
                    Design review · 4 people
                  </p>
                </div>
              </div>
            </template>

            <template #timer>
              <div class="flex w-64 items-center gap-3 overflow-hidden px-4 py-2">
                <UIcon
                  name="i-lucide-hourglass"
                  class="h-5 w-5 text-fuchsia-400"
                />
                <div class="flex-1">
                  <p class="pointer-events-none font-medium text-sm text-white">
                    Custom timer slot
                  </p>
                  <p class="pointer-events-none text-white text-xs opacity-70">
                    The default countdown is replaced entirely.
                  </p>
                </div>
              </div>
            </template>
          </MDynamicIsland>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type View = 'idle' | 'ring' | 'timer' | 'notification' | 'music'

const VIEWS: View[] = ['idle', 'ring', 'timer', 'notification', 'music']
const SLOT_VIEWS: View[] = ['idle', 'ring', 'timer']

const view = ref<View>('idle')
const slotView = ref<View>('idle')
const lastEmitted = ref('—')

function recordEmitted(next: View) {
  lastEmitted.value = next
  // The reference's `onViewChange` is the only way a controlled parent learns
  // about clicks on the island's own bottom switcher, so it must feed the
  // `view` prop back in.
  view.value = next
}
</script>
