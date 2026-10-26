<script setup lang="ts">
import { computed, ref } from 'vue'

export interface MorphToggleProps {
  /** Controlled state. Leave it out to let the component keep its own. */
  modelValue?: boolean
  /** Extra classes for the button. */
  class?: string
  /** Initial state in uncontrolled usage. */
  defaultChecked?: boolean
  /** Disable the toggle. */
  disabled?: boolean
  /** Accessible name for the switch. */
  label?: string
  /** Size of the track and thumb. */
  size?: 'sm' | 'md' | 'lg'
  /** Visual treatment. `morph` squares the thumb while off. */
  variant?: 'default' | 'morph' | 'icon'
}

const props = withDefaults(defineProps<MorphToggleProps>(), {
  modelValue: undefined,
  class: undefined,
  defaultChecked: false,
  disabled: false,
  label: undefined,
  size: 'md',
  variant: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const SIZES = {
  lg: { icon: 'size-3.5', thumb: 'size-6', track: 'h-7 w-[52px]', translate: 24 },
  md: { icon: 'size-3', thumb: 'size-5', track: 'h-6 w-11', translate: 20 },
  sm: { icon: 'size-2.5', thumb: 'size-4', track: 'h-5 w-9', translate: 16 },
} as const

const internalChecked = ref(props.defaultChecked)
const isControlled = computed(() => props.modelValue !== undefined)
const checked = computed(() => (isControlled.value ? props.modelValue! : internalChecked.value))

const sizeConfig = computed(() => SIZES[props.size])

const thumbRadius = computed(() => {
  if (props.variant !== 'morph') {
    return 9999
  }

  return checked.value ? 9999 : 6
})

const thumbStyle = computed(() => ({
  borderRadius: `${thumbRadius.value}px`,
  transform: `translateX(${checked.value ? sizeConfig.value.translate : 0}px)`,
}))

function toggle() {
  if (props.disabled) {
    return
  }

  const next = !checked.value

  if (!isControlled.value) {
    internalChecked.value = next
  }

  emit('update:modelValue', next)
}
</script>

<template>
  <button
    :aria-checked="checked"
    :aria-label="props.label ?? 'Toggle'"
    :class="[
      'relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default',
      checked ? 'bg-primary' : 'bg-inverted/20',
      props.disabled && 'cursor-not-allowed opacity-50',
      sizeConfig.track,
      props.class,
    ]"
    :disabled="props.disabled"
    role="switch"
    type="button"
    @click="toggle"
  >
    <span
      :class="[
        'pointer-events-none flex items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-[transform,border-radius] duration-300 ease-out motion-reduce:transition-none',
        sizeConfig.thumb,
      ]"
      :style="thumbStyle"
    >
      <Transition
        v-if="props.variant === 'icon'"
        mode="out-in"
        name="morph-icon"
      >
        <span
          :key="checked ? 'on' : 'off'"
          :class="['flex items-center justify-center text-neutral-600', sizeConfig.icon]"
        >
          <slot :name="checked ? 'icon-on' : 'icon-off'">
            <UIcon :name="checked ? 'i-lucide-check' : 'i-lucide-x'" />
          </slot>
        </span>
      </Transition>
    </span>
  </button>
</template>

<style scoped>
.morph-icon-enter-active,
.morph-icon-leave-active {
  transition:
    opacity 150ms ease,
    transform 150ms ease;
}

.morph-icon-enter-from {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}

.morph-icon-leave-to {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

@media (prefers-reduced-motion: reduce) {
  .morph-icon-enter-active,
  .morph-icon-leave-active {
    transition: none;
  }
}
</style>
