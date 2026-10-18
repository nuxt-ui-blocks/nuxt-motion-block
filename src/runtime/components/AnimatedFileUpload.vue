<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import animatedFileUpload from '../theme/animated-file-upload'

defineOptions({ inheritAttrs: false })

interface Props {
  ui?: Record<string, any>
  class?: string
  label?: string
  dragLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Drag & drop or click to upload',
  dragLabel: 'Drop files here',
  ui: undefined,
  class: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'animatedFileUpload', props, theme: animatedFileUpload })

const fileUploadRef = useTemplateRef<ComponentPublicInstance & { dropzoneRef?: HTMLElement }>('fileUpload')
const isDragOver = ref(false)

const fileUploadUi = computed(() => ({
  ...uiProps.ui,
  root: ui.value.root({ class: uiProps.ui?.root }),
}))

const dropLabel = computed(() => (isDragOver.value ? props.dragLabel : props.label))

let observer: MutationObserver | undefined

onMounted(() => {
  // UFileUpload has a fragment root, so $el is not an element. It exposes the
  // dropzone element itself, which is exactly the node carrying data-dragging.
  const target = fileUploadRef.value
  const el = (target?.dropzoneRef ?? (target?.$el instanceof Element ? target.$el : undefined)) as HTMLElement | undefined
  if (!el) return
  const read = () => el.getAttribute('data-dragging') === 'true'
  isDragOver.value = read()
  observer = new MutationObserver(() => {
    isDragOver.value = read()
  })
  observer.observe(el, { attributes: true, attributeFilter: ['data-dragging'] })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = undefined
})
</script>

<template>
  <UFileUpload
    ref="fileUpload"
    v-bind="$attrs"
    :class="uiProps.class"
    :ui="fileUploadUi"
  >
    <template #label>
      <Transition
        name="m-file-label"
        mode="out-in"
      >
        <span :key="isDragOver ? 'drop' : 'idle'">{{ dropLabel }}</span>
      </Transition>
    </template>
  </UFileUpload>
</template>

<style>
/* Idle -> dragging: the drop zone scales up and takes the primary border colour. */
.m-file-upload [data-slot="base"] {
  transition:
    transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1),
    border-color 200ms ease-out,
    background-color 200ms ease-out;
}

.m-file-upload [data-slot="base"][data-dragging="true"] {
  transform: scale(1.02);
  border-color: var(--ui-primary);
}

/* The upload icon floats up while files are held over the zone. */
.m-file-upload [data-slot="avatar"],
.m-file-upload [data-slot="icon"] {
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.m-file-upload [data-slot="base"][data-dragging="true"] [data-slot="avatar"],
.m-file-upload [data-slot="base"][data-dragging="true"] [data-slot="icon"] {
  transform: translateY(-4px) scale(1.15);
}

/* File rows slide in from the left, staggered by 40ms. */
.m-file-upload [data-slot="file"] {
  animation: m-file-row-in 250ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.m-file-upload [data-slot="file"]:nth-child(1) { animation-delay: 0ms; }
.m-file-upload [data-slot="file"]:nth-child(2) { animation-delay: 40ms; }
.m-file-upload [data-slot="file"]:nth-child(3) { animation-delay: 80ms; }
.m-file-upload [data-slot="file"]:nth-child(4) { animation-delay: 120ms; }
.m-file-upload [data-slot="file"]:nth-child(5) { animation-delay: 160ms; }
.m-file-upload [data-slot="file"]:nth-child(6) { animation-delay: 200ms; }
.m-file-upload [data-slot="file"]:nth-child(7) { animation-delay: 240ms; }
.m-file-upload [data-slot="file"]:nth-child(8) { animation-delay: 280ms; }
.m-file-upload [data-slot="file"]:nth-child(n + 9) { animation-delay: 320ms; }

@keyframes m-file-row-in {
  from {
    opacity: 0;
    transform: translateX(-16px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

/* Remove button hover / press feedback. */
.m-file-upload [data-slot="fileTrailingButton"] {
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.m-file-upload [data-slot="fileTrailingButton"]:hover {
  transform: scale(1.1);
}

.m-file-upload [data-slot="fileTrailingButton"]:active {
  transform: scale(0.9);
}

/* Label swap between the idle and drop copy. */
.m-file-label-enter-active,
.m-file-label-leave-active {
  transition: opacity 150ms ease-out, transform 150ms ease-out;
}

.m-file-label-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.m-file-label-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .m-file-upload [data-slot="base"],
  .m-file-upload [data-slot="avatar"],
  .m-file-upload [data-slot="icon"],
  .m-file-upload [data-slot="fileTrailingButton"],
  .m-file-label-enter-active,
  .m-file-label-leave-active {
    transition: none;
  }

  .m-file-upload [data-slot="base"][data-dragging="true"],
  .m-file-upload [data-slot="base"][data-dragging="true"] [data-slot="avatar"],
  .m-file-upload [data-slot="base"][data-dragging="true"] [data-slot="icon"],
  .m-file-upload [data-slot="fileTrailingButton"]:hover,
  .m-file-upload [data-slot="fileTrailingButton"]:active {
    transform: none;
  }

  .m-file-upload [data-slot="file"] {
    animation: none;
  }

  .m-file-label-enter-from,
  .m-file-label-leave-to {
    transform: none;
  }
}
</style>
