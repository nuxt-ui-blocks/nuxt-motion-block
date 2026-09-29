<template>
  <div class="space-y-12">
    <UPageHeader
      title="BasicDropdown"
      description="Portal dropdown with a spring scaleY reveal, virtual keyboard focus, and a rotating chevron."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Default
        </p>
      </template>
      <div class="space-y-4">
        <!--
          The open panel is only as wide as the trigger and hangs below it, so the readout controls
          sit beside the trigger instead of underneath — otherwise they are covered by the panel.
          @mousedown/@click.stop keeps them from counting as an "outside click" that closes it.
        -->
        <div class="flex flex-wrap items-center gap-3">
          <MBasicDropdown
            data-testid="dd-default"
            :items="plainItems"
            label="Select option"
            @change="logChange"
          />
          <UButton
            size="xs"
            variant="outline"
            data-testid="read-live"
            @mousedown.stop
            @click.stop="readLive"
          >
            Read live DOM state
          </UButton>
          <UButton
            size="xs"
            variant="ghost"
            data-testid="reset-log"
            @mousedown.stop
            @click.stop="resetLog"
          >
            Reset change log
          </UButton>
        </div>

        <!--
          Read straight out of the DOM instead of mirroring the component's own state, so a bug
          in the component's aria/label logic shows up here instead of being echoed back.
        -->
        <pre
          v-if="live"
          class="max-h-56 overflow-auto rounded-lg bg-muted p-3 text-xs text-highlighted"
          data-testid="live-state"
        >{{ live }}</pre>

        <p
          class="text-sm text-muted"
          data-testid="default-log"
        >
          change events: {{ changeLog.length }}
          <span v-if="lastChange"> — last: <span class="text-highlighted">{{ lastChange }}</span></span>
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          With item icons (controlled via v-model)
        </p>
      </template>
      <div class="space-y-4">
        <MBasicDropdown
          v-model="controlledSelection"
          :items="iconItems"
          label="Choose a workspace"
          data-testid="model-value-trigger"
        />
        <p class="text-sm text-muted">
          v-model value: <code
            class="text-highlighted"
            data-testid="model-value"
          >{{ controlledSelection ? controlledSelection.label : 'null' }}</code>
        </p>
        <div class="flex gap-2">
          <UButton
            size="xs"
            variant="outline"
            data-testid="clear-model"
            @click="controlledSelection = null"
          >
            Clear v-model
          </UButton>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Edge cases
        </p>
      </template>
      <p class="mb-4 text-sm text-muted">
        An empty item list must still open (with an empty <code class="text-highlighted">list</code>) and must not throw on
        <code class="text-highlighted">Home</code>/<code class="text-highlighted">End</code>/<code class="text-highlighted">Enter</code>, because there is no
        item to focus or select. A single item wraps onto itself.
      </p>
      <div class="flex flex-wrap items-center gap-4">
        <MBasicDropdown
          :items="emptyItems"
          label="No options"
        />
        <!--
          `class` is a declared prop, so Vue keeps it out of `$attrs` and it has to be bound onto
          `USelect` explicitly — which then forwards it to the trigger. `max-w-56` (rather than a
          `w-*` value) is used on purpose: the theme's trigger already carries `w-full`, and two
          competing `width` utilities would be settled by stylesheet order, not by this prop.
        -->
        <MBasicDropdown
          :items="singleItem"
          label="Only one"
          class="max-w-56"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Keyboard map
        </p>
      </template>
      <ul class="space-y-1 text-sm text-muted">
        <li>Enter / Space on the focused trigger — open</li>
        <li>ArrowDown / ArrowUp — move the virtual focus (wraps)</li>
        <li>Home / End — jump to first / last</li>
        <li>Enter — select the focused option</li>
        <li>Escape — close and return focus to the trigger</li>
        <li>Click anywhere outside — close</li>
      </ul>
      <p
        class="mt-3 text-sm text-muted"
        data-testid="keyboard-log"
      >
        Last keyboard action: <span class="text-highlighted">{{ keyboardLog || 'none' }}</span>
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Many instances (isolated panels)
        </p>
      </template>
      <p class="mb-4 text-sm text-muted">
        Each instance keeps its own listbox mounted in its own portal, and only the open one is
        present in the DOM, so opening one never leaves a stale panel — or a body scroll lock —
        behind on the others. A deviation worth knowing: Reka's
        <code class="text-highlighted">SelectTrigger</code> does not put
        <code class="text-highlighted">aria-controls</code> on the trigger, so the combobox has no
        programmatic link to its list. Focus moves into the listbox on open and back to the trigger
        on close, which is what makes it usable, but a bare
        <code class="text-highlighted">USelect</code> behaves the same way.
      </p>
      <div class="flex flex-wrap gap-4">
        <MBasicDropdown
          :items="plainItems"
          label="Region"
          @change="logChange"
        />
        <MBasicDropdown
          :items="iconItems"
          label="Language"
        />
        <MBasicDropdown
          :items="singleItem"
          label="Plan"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const plainItems = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
]

const iconItems = [
  { id: 'home', label: 'Home', icon: 'i-lucide-house' },
  { id: 'search', label: 'Search', icon: 'i-lucide-search' },
  { id: 'settings', label: 'Settings', icon: 'i-lucide-settings' },
]

const singleItem = [
  { id: 'free', label: 'Free' },
]

const emptyItems: Array<{ id: string, label: string }> = []

const changeLog = ref<string[]>([])
const keyboardLog = ref('')
const live = ref('')

const controlledSelection = ref<{ id: string, label: string, icon?: string } | null>(null)

const lastChange = computed(() => changeLog.value.at(-1) ?? '')

function logChange(item: { label: string }) {
  changeLog.value = [...changeLog.value, item.label]
  keyboardLog.value = `change -> ${item.label}`
}

function resetLog() {
  changeLog.value = []
  keyboardLog.value = ''
  live.value = ''
}

// Reads the rendered DOM of the default instance so the readout is evidence, not an echo of the
// component's own reactive state.
function readLive() {
  if (!import.meta.client) {
    return
  }

  // `data-testid` now lands on the trigger itself: `USelect` forwards fallthrough attributes to its
  // `SelectTrigger`. The panel is not a descendant of it — it is teleported to `<body>` — so it has
  // to be looked up separately. Reka puts `role="listbox"` and the content id on the element
  // carrying `data-slot="content"`, and that element is what its `usePresence` tracks for
  // `animationend`, so it is also where the panel's animation is read from.
  const trigger = document.querySelector<HTMLElement>('[data-testid="dd-default"]')
  const panel = document.querySelector<HTMLElement>('[data-slot="content"]')

  if (!trigger) {
    live.value = 'trigger not found (data-testid fallthrough is broken)'
    return
  }

  const options = [...document.querySelectorAll<HTMLElement>('[data-slot="item"]')].map((item) => {
    const label = item.querySelector('[data-slot="itemLabel"]')?.textContent?.trim() ?? ''
    const check = item.querySelector('[data-slot="itemTrailingIcon"]') ? 'yes' : 'no'
    const icon = item.querySelector('[data-slot="itemLeadingIcon"]') ? 'yes' : 'no'
    return `      - "${label}" role=${item.getAttribute('role')} aria-selected=${item.getAttribute('aria-selected')} data-state=${item.getAttribute('data-state')} check=${check} icon=${icon}`
  })

  live.value = [
    `trigger tag/role      ${trigger.tagName.toLowerCase()}/${trigger.getAttribute('role')}`,
    `trigger aria-label    ${trigger.getAttribute('aria-label')}`,
    `trigger aria-expanded ${trigger.getAttribute('aria-expanded')}`,
    `trigger aria-haspopup ${trigger.getAttribute('aria-haspopup') ?? 'null (combobox implies it)'}`,
    `trigger aria-controls ${trigger.getAttribute('aria-controls') ?? 'null (Reka does not render it)'}`,
    `chevron transform     ${getComputedStyle(trigger.querySelector('[data-slot="trailing"] div') ?? trigger).transform}`,
    `panel present         ${panel ? 'yes' : 'no'}`,
    `panel data-state      ${panel?.getAttribute('data-state') ?? 'null'}`,
    `panel animation       ${panel ? getComputedStyle(panel).animationName : 'null'}`,
    `panel transform-origin ${panel ? getComputedStyle(panel).transformOrigin : 'null'}`,
    `popper wrapper style  ${panel?.parentElement?.getAttribute('style') ?? 'null'}`,
    `listbox id            ${panel?.id ?? 'null'}`,
    'options:',
    ...(options.length ? options : ['      (none)']),
  ].join('\n')
}
</script>
