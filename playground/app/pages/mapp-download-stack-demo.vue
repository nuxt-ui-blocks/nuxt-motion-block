<template>
  <div class="space-y-12">
    <UPageHeader
      title="AppDownloadStack"
      description="A fanned icon stack that expands into a multi-select grid, runs a timed download, and resets. Drive it uncontrolled, or fully controlled with v-model:expanded / v-model:selected-apps."
    />

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Uncontrolled — internal state
        </p>
      </template>

      <p class="mb-4 text-muted text-sm">
        No <code>expanded</code> / <code>selectedApps</code> props: the stack drives
        itself. Click the stack, tick some apps, hit Download Selected, then watch
        it run 3s of downloading, 1s of completion, and reset back to the stack.
      </p>

      <div class="mx-auto max-w-sm">
        <MAppDownloadStack
          data-demo-uncontrolled
          @download="record('uncontrolled', 'download', $event)"
        />
      </div>

      <p class="mt-4 text-muted text-sm">
        last event: <code data-demo-log-uncontrolled>{{ log.uncontrolled }}</code>
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Uncontrolled — custom apps &amp; title
        </p>
      </template>

      <p class="mb-4 text-muted text-sm">
        Custom apps built from Nuxt UI icons, a custom <code>title</code>, and
        a custom <code>class</code> on the outer column.
      </p>

      <div class="mx-auto max-w-sm">
        <MAppDownloadStack
          :apps="localApps"
          class="rounded-xl bg-elevated p-6"
          title="My Apps"
          data-demo-custom
          @change="record('custom', 'change', $event)"
          @expand-change="record('custom', 'expand-change', $event)"
        />
      </div>

      <p class="mt-4 text-muted text-sm">
        last event: <code data-demo-log-custom>{{ log.custom }}</code>
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Controlled — <code>v-model:expanded</code> + <code>v-model:selected-apps</code>
        </p>
      </template>

      <p class="mb-4 text-muted text-sm">
        Every emitted payload is fed back in. Forcing <code>expanded</code> to
        <code>false</code> from here collapses the panel even mid-download, and
        nothing selects unless the parent writes it back — that is the contract
        the React reference keeps when both a controlled prop and a change
        handler are supplied.
      </p>

      <div class="mb-4 flex flex-wrap items-center gap-2">
        <UButton
          size="sm"
          :variant="expanded ? 'solid' : 'outline'"
          @click="expanded = !expanded"
        >
          toggle expanded ({{ expanded ? 'open' : 'closed' }})
        </UButton>
        <UButton
          size="sm"
          :variant="selectedApps.length ? 'solid' : 'outline'"
          @click="selectedApps = [1, 2]"
        >
          force select [1, 2]
        </UButton>
        <UButton
          size="sm"
          :variant="selectedApps.length ? 'solid' : 'outline'"
          @click="selectedApps = []"
        >
          clear selection
        </UButton>
      </div>

      <p class="mb-4 text-muted text-sm">
        <span class="font-mono">expanded</span> = <code data-demo-expanded>{{ expanded }}</code>
        · <span class="font-mono">selectedApps</span> = <code data-demo-selected>{{ selectedJson }}</code>
        · last event = <code data-demo-log-controlled>{{ log.controlled }}</code>
      </p>

      <div class="mx-auto max-w-sm">
        <MAppDownloadStack
          v-model:expanded="expanded"
          v-model:selected-apps="selectedApps"
          :apps="localApps"
          title="Controlled Stack"
          data-demo-controlled
          @change="onControlledChange"
          @download="record('controlled', 'download', $event)"
          @expand-change="onControlledExpand"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

/**
 * Nuxt UI icon names, so the demo needs no remote assets. `name` doubles as the
 * accessible name the component puts on the label of both the stack icon and
 * the grid tile.
 */
const localApps = [
  { icon: 'i-lucide-nut', id: 1, name: 'Acorn' },
  { icon: 'i-lucide-mountain', id: 2, name: 'Basalt' },
  { icon: 'i-lucide-hexagon', id: 3, name: 'Cobalt' },
  { icon: 'i-lucide-sun', id: 4, name: 'Dune' },
]

const expanded = ref(true)
const selectedApps = ref<number[]>([])

const log = reactive<Record<string, string>>({
  controlled: '—',
  custom: '—',
  uncontrolled: '—',
})

const selectedJson = computed(() => JSON.stringify(selectedApps.value))

function record(scope: string, name: string, payload: unknown) {
  log[scope] = `${name}(${JSON.stringify(payload)})`
}

/**
 * The React reference only calls `onChange` and keeps nothing itself, so a
 * controlled parent owns the value. Feeding the payload back is exactly what
 * its `ControlledStack` test wrapper does.
 */
function onControlledChange(ids: number[]) {
  selectedApps.value = [...ids]
  record('controlled', 'change', ids)
}

function onControlledExpand(next: boolean) {
  expanded.value = next
  record('controlled', 'expand-change', next)
}
</script>
