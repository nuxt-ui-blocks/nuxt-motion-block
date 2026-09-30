<template>
  <div class="space-y-12">
    <UPageHeader
      title="BasicToast"
      description="Portalled toast with spring scale/slide entrance, type variants, an auto-dismiss timer, and a manual close button."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Default props (mount on demand)
        </p>
      </template>
      <p class="mb-4 text-sm text-muted">
        This is the component with <em>no</em> props beyond
        <code class="text-highlighted">message</code> — so
        <code class="text-highlighted">type</code> defaults to
        <code class="text-highlighted">info</code>,
        <code class="text-highlighted">duration</code> to
        <code class="text-highlighted">3000</code> and
        <code class="text-highlighted">isVisible</code> to
        <code class="text-highlighted">true</code>. Mount it to see it appear on the first paint.
      </p>
      <div class="flex flex-wrap gap-3">
        <UButton
          :label="bareMounted ? 'Unmount default toast' : 'Mount default toast'"
          variant="outline"
          data-testid="toggle-bare"
          @click="bareMounted = !bareMounted"
        />
        <UButton
          label="Inspect portalled DOM"
          variant="ghost"
          data-testid="inspect-dom"
          @click="inspect"
        />
      </div>
      <pre
        v-if="domReport"
        class="mt-3 max-h-56 overflow-auto rounded-lg bg-muted p-3 text-xs text-highlighted"
        data-testid="dom-report"
      >{{ domReport }}</pre>
      <div
        data-testid="bare-toast-anchor"
        class="h-0"
      >
        <MBasicToast
          v-if="bareMounted"
          message="Test message"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Types
        </p>
      </template>
      <p class="mb-4 text-sm text-muted">
        Each button (re)shows its toast. The toast auto-dismisses after its duration, emits
        <code class="text-highlighted">close</code>, and the panel below records the event.
      </p>
      <div class="flex flex-wrap gap-3">
        <UButton
          v-for="t in typeButtons"
          :key="t.type"
          :label="t.type"
          :color="t.color"
          variant="solid"
          :data-testid="`show-${t.key}`"
          @click="show(t.key)"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Duration
        </p>
      </template>
      <p class="mb-4 text-sm text-muted">
        <code class="text-highlighted">duration = 0</code> disables the timer, so that toast only leaves
        through its own close button.
      </p>
      <div class="flex flex-wrap gap-3">
        <UButton
          label="Quick (1.2s)"
          variant="outline"
          data-testid="show-quick"
          @click="show('quick')"
        />
        <UButton
          label="Default (3s)"
          variant="outline"
          data-testid="show-default"
          @click="show('default')"
        />
        <UButton
          label="Sticky (0 — manual close only)"
          variant="outline"
          data-testid="show-sticky"
          @click="show('sticky')"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          close events
        </p>
      </template>
      <p
        class="text-sm text-muted"
        data-testid="close-log"
      >
        count: {{ closeLog.length }}
      </p>
      <ul
        v-if="closeLog.length"
        class="mt-2 max-h-40 space-y-1 overflow-auto text-xs text-muted"
        data-testid="close-log-list"
      >
        <li
          v-for="(entry, i) in [...closeLog].reverse()"
          :key="i"
        >
          #{{ closeLog.length - i }} — {{ entry }}
        </li>
      </ul>
    </UCard>

    <div>
      <MBasicToast
        v-for="toast in toasts"
        :key="toast.key"
        v-model:is-visible="toast.visible"
        :data-testid="toast.key === 'sticky' ? 'sticky-toast' : undefined"
        :message="toast.message"
        :type="toast.type"
        :duration="toast.duration"
        @close="onClose(toast.key)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type { ButtonProps } from '#ui/components/Button.vue'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface DemoToast {
  key: string
  message: string
  type: ToastType
  duration: number
  visible: boolean
}

const SEEDS: Record<string, Omit<DemoToast, 'key' | 'visible'>> = {
  success: { message: 'This is a success message example!', type: 'success', duration: 3000 },
  error: { message: 'This is an error message example!', type: 'error', duration: 3000 },
  info: { message: 'This is an info message example!', type: 'info', duration: 3000 },
  warning: { message: 'This is a warning message example!', type: 'warning', duration: 3000 },
  quick: { message: 'Quick toast — gone in 1.2 seconds.', type: 'info', duration: 1200 },
  default: { message: 'Default toast — gone in 3 seconds.', type: 'info', duration: 3000 },
  sticky: { message: 'Sticky toast — no timer, close me with the X button.', type: 'warning', duration: 0 },
}

const typeButtons: Array<{ key: string, type: string, color: ButtonProps['color'] }> = [
  { key: 'success', type: 'Success', color: 'success' },
  { key: 'error', type: 'Error', color: 'error' },
  { key: 'warning', type: 'Warning', color: 'warning' },
  { key: 'info', type: 'Info', color: 'info' },
]

const toasts = ref<DemoToast[]>(
  Object.entries(SEEDS).map(([key, seed]) => ({ key, ...seed, visible: false })),
)

const closeLog = ref<string[]>([])
const bareMounted = ref(false)
const domReport = ref('')

// Flip to false first so the component replays its exit + re-entry cycle and restarts
// the auto-dismiss timer, even when that toast is already on screen.
async function show(key: string) {
  const toast = toasts.value.find(t => t.key === key)
  if (!toast) {
    return
  }
  toast.visible = false
  await nextTick()
  toast.visible = true
}

function onClose(key: string) {
  closeLog.value = [...closeLog.value, `${key} @ ${new Date().toISOString().slice(11, 23)}`]
}

// Proves the toast is teleported to <body> instead of being rendered inside the demo tree, and
// dumps the resolved classes/ARIA of whatever toast is currently on screen.
function inspect() {
  if (!import.meta.client) {
    return
  }

  const anchor = document.querySelector('[data-testid="bare-toast-anchor"]')
  const toastsInDom = [...document.querySelectorAll('.m-toast')]
  const toast = toastsInDom[toastsInDom.length - 1] ?? null

  if (!toast) {
    domReport.value = 'no .m-toast in the document'
    return
  }

  const icon = toast.querySelector('[class*="iconify"]')
  const closeBtn = toast.querySelector('button')
  const rect = toast.getBoundingClientRect()

  domReport.value = [
    `toast count in dom     ${toastsInDom.length}`,
    `direct child of body   ${toast.parentElement === document.body}`,
    `inside demo anchor     ${anchor ? anchor.contains(toast) : 'anchor not mounted'}`,
    `inline style           ${toast.getAttribute('style')}`,
    `computed opacity       ${getComputedStyle(toast).opacity}`,
    `computed transform     ${getComputedStyle(toast).transform}`,
    `position / z-index     ${getComputedStyle(toast).position} / ${getComputedStyle(toast).zIndex}`,
    `rect                   top=${Math.round(rect.top)} right=${Math.round(window.innerWidth - rect.right)} w=${Math.round(rect.width)}`,
    `message                "${toast.querySelector('p')?.textContent?.trim()}"`,
    `icon                   ${icon?.className ?? 'none'}`,
    `icon aria-hidden       ${icon?.getAttribute('aria-hidden') ?? 'null'}`,
    `icon sr-only sibling   "${toast.querySelector('.sr-only')?.textContent?.trim() ?? 'none'}"`,
    `close btn aria-label   ${closeBtn?.getAttribute('aria-label') ?? 'null'}`,
    `close btn type         ${closeBtn?.getAttribute('type') ?? 'null'}`,
  ].join('\n')
}
</script>
