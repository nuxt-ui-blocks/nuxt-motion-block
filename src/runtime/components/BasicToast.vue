<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import { useToast } from '#imports'

export interface Props {
  /** How long the toast stays up, in milliseconds. `0` keeps it until dismissed. */
  duration?: number
  /** Whether the toast is currently shown. Supports `v-model:is-visible`. */
  isVisible?: boolean
  /** The toast body text. */
  message: string
  /** Selects the icon colour, matching Nuxt UI toast colours. */
  type?: ToastType
}

const props = withDefaults(defineProps<Props>(), {
  duration: 3000,
  isVisible: true,
  type: 'info',
})

const emit = defineEmits<{
  'close': []
  'update:isVisible': [value: boolean]
}>()

// This component renders no markup of its own: it forwards to Nuxt UI's shared
// `useToast()` store, which a single app-level `<MToaster>` renders with motion.
// Opting out of attribute fallthrough avoids an extraneous-attrs warning against
// the empty root.
defineOptions({ inheritAttrs: false })

const { toasts, add, remove, update } = useToast()

let id: string | number | undefined

function open() {
  if (id) {
    return
  }
  id = add({ title: props.message, color: props.type, duration: props.duration }).id
}

function close(notify = true) {
  if (!id) {
    return
  }
  remove(id)
  id = undefined
  if (notify) {
    emit('close')
    emit('update:isVisible', false)
  }
}

if (import.meta.client) {
  watch(() => props.isVisible, value => (value ? open() : close()), { immediate: true })

  watch([() => props.message, () => props.type, () => props.duration], () => {
    if (id) {
      update(id, { title: props.message, color: props.type, duration: props.duration })
    }
  })

  // Reflect dismissals that happen outside the component — the auto-dismiss
  // timer, or a swipe in the toaster — back into `isVisible`.
  watch(toasts, (value) => {
    if (id && !value.some(toast => toast.id === id)) {
      id = undefined
      emit('close')
      emit('update:isVisible', false)
    }
  }, { deep: true })

  onBeforeUnmount(() => close(false))
}

defineExpose({ dismiss: () => close() })
</script>

<template>
  <span v-if="false" />
</template>

<script lang="ts">
export type ToastType = 'success' | 'error' | 'info' | 'warning'
</script>
