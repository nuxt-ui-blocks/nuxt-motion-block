<template>
  <div :class="props.class">
    <!--
      The ring is the status, and it is drawn rather than spelled. A screen
      reader gets the same information as a word, in the same place the sighted
      reader finds it.
    -->
    <span class="sr-only">{{ statusLabel }}</span>

    <UChatTool
      class="w-full"
      variant="card"
      :text="props.name"
      :suffix="props.summary"
      :icon="badge"
      :loading="false"
      :streaming="isRunning"
      :default-open="props.defaultOpen"
      :unmount-on-hide="true"
      :ui="ui"
    >
      <template
        v-if="hasDetail()"
        #default
      >
        <div class="space-y-2 text-xs">
          <div v-if="slots.args">
            <p class="mb-1 text-[10px] uppercase tracking-wide text-muted">
              Arguments
            </p>
            <div class="overflow-x-auto font-mono text-highlighted">
              <slot name="args" />
            </div>
          </div>
          <div v-if="slots.result">
            <p class="mb-1 text-[10px] uppercase tracking-wide text-muted">
              Result
            </p>
            <div class="overflow-x-auto text-highlighted">
              <slot name="result" />
            </div>
          </div>
        </div>
      </template>
    </UChatTool>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h } from 'vue'
import type { AIToolCallStatus } from '../types/ai'
import AiToolCallBadge from '../utils/AiToolCallBadge.vue'

export type { AIToolCallStatus } from '../types/ai'

/**
 * A single tool invocation, collapsed by default.
 *
 * Built on Nuxt UI's `ChatTool`, so the disclosure, the streaming shimmer and the
 * card frame behave like every other tool call on the page.
 *
 * Status stays this component's own four-value enum rather than collapsing into
 * `ChatStatus`: a tool call has a lifecycle, not a mood, and borrowing the shared
 * conversation vocabulary here would imply a connection the data does not have.
 * The booleans `ChatTool` speaks are derived from it below.
 */
const STATUS_LABEL: Record<AIToolCallStatus, string> = {
  error: 'Failed',
  pending: 'Queued',
  running: 'Running',
  success: 'Done',
}

interface Props {
  class?: string
  defaultOpen?: boolean
  /** Tool name, e.g. `search_web`. */
  name: string
  status?: AIToolCallStatus
  /** Short trailing note, e.g. "3 files" or "1.2s". */
  summary?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  defaultOpen: false,
  status: 'pending',
  summary: undefined,
})

const slots = defineSlots<{
  default?: () => unknown
  args?: () => unknown
  result?: () => unknown
}>()

// A function rather than a computed: slot presence is not reactive state, and a
// cached `false` would leave the disclosure unreachable if a caller supplied the
// slot later.
function hasDetail() {
  return Boolean(slots.args || slots.result)
}

const isRunning = computed(() => props.status === 'running')
const statusLabel = computed(() => STATUS_LABEL[props.status])

/**
 * `ChatTool` renders its icon through `UIcon`, which resolves a component as well
 * as a name — so the ring can be handed over as-is. Reading `props.status` inside
 * the render function is what keeps the ring's lifecycle live; resolving a new
 * component per status would tear the ring down on every tick.
 */
const badge = defineComponent({
  name: 'AiToolCallBadgeIcon',
  setup() {
    return () => h(AiToolCallBadge, { status: props.status })
  },
})

/**
 * Three of these are undoing Nuxt UI's own icon choreography rather than adding
 * anything: the leading icon is designed to be swapped out for a chevron on
 * hover, and to be absolutely positioned so the swap is free. Here the ring is
 * the permanent marker and the chevron already lives on the trailing edge, so the
 * icon keeps its own box and its own opacity.
 */
const ui = {
  label: 'font-mono text-xs font-medium text-highlighted',
  leading: '!size-5',
  leadingIcon: '!static !inset-auto !size-5 !opacity-100',
}
</script>
