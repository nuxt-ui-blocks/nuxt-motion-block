<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <div :class="ui.pane({ class: uiProps.ui?.pane })">
      <div
        v-if="beforeLabel"
        :class="ui.header({ class: uiProps.ui?.header })"
      >
        {{ beforeLabel }}
      </div>
      <pre :class="ui.code({ class: uiProps.ui?.code })"><code><slot name="before">{{ before }}</slot></code></pre>
    </div>

    <div
      :class="ui.pane({ class: uiProps.ui?.pane })"
      :style="{ clipPath: `inset(0 0 0 ${position}%)` }"
    >
      <div
        v-if="afterLabel"
        :class="ui.header({ class: uiProps.ui?.header })"
      >
        {{ afterLabel }}
      </div>
      <pre :class="ui.code({ class: uiProps.ui?.code })"><code><slot name="after">{{ after }}</slot></code></pre>
    </div>

    <div
      aria-hidden="true"
      :class="ui.divider({ class: uiProps.ui?.divider })"
      :style="{ left: `${position}%` }"
    >
      <span :class="ui.handle({ class: uiProps.ui?.handle })">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          class="size-4"
        >
          <path d="m9 6-4 6 4 6" />
          <path d="m15 6 4 6-4 6" />
        </svg>
      </span>
    </div>

    <input
      type="range"
      min="0"
      max="100"
      step="0.1"
      :value="position"
      :aria-label="ariaLabel"
      :class="ui.slider({ class: uiProps.ui?.slider })"
      @input="onInput"
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import codeComparison from '../theme/code-comparison'

export interface CodeComparisonProps {
  /** Text for the right-hand pane. Ignored when the `after` slot is filled. */
  after?: string
  /** Label shown above the right-hand pane. */
  afterLabel?: string
  /** Accessible description of the divider. */
  ariaLabel?: string
  /** Text for the left-hand pane. Ignored when the `before` slot is filled. */
  before?: string
  /** Label shown above the left-hand pane. */
  beforeLabel?: string
  /** Extra classes for the frame. */
  class?: string
  /** Where the divider starts, from `0` to `100`. */
  modelValue?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<CodeComparisonProps>(), {
  after: '',
  afterLabel: undefined,
  ariaLabel: 'Reveal amount',
  before: '',
  beforeLabel: undefined,
  class: undefined,
  modelValue: 50,
  ui: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const { props: uiProps, ui } = useMotionBlockUI({ name: 'codeComparison', props, theme: codeComparison })

const position = ref(props.modelValue)

watch(() => props.modelValue, (next) => {
  position.value = next
})

/** The range input is the only interactive element, so it owns the value. */
const onInput = (event: Event) => {
  const next = Number((event.target as HTMLInputElement).value)
  position.value = next
  emit('update:modelValue', next)
}
</script>
