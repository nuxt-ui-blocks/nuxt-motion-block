<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

export interface ImageData {
  /** Stable identifier used by the selection list. */
  id: number
  /** Image URL. */
  src: string
}

export interface InteractiveImageSelectorProps {
  /** Extra classes for the root. */
  class?: string
  /** Images shown in the grid. */
  images: ImageData[]
  /** Start in selection mode. */
  selectable?: boolean
  /** Controlled selection. Leave undefined to let the component own it. */
  selectedImages?: number[]
}

const props = withDefaults(defineProps<InteractiveImageSelectorProps>(), {
  class: undefined,
  selectable: false,
  selectedImages: undefined,
})

const emit = defineEmits<{
  'change': [selected: number[]]
  'delete': [deleted: number[]]
  'share': [selected: number[]]
  'update:selectedImages': [selected: number[]]
}>()

/** How long the reset wobble runs before the gallery is restored. */
const RESET_DELAY = 200

const originalImages = ref(props.images.map(image => ({ ...image })))
const internalImages = ref(props.images.map(image => ({ ...image })))
const internalSelected = ref<number[]>([])
const isSelecting = ref(props.selectable)
const isResetting = ref(false)

let resetTimer: ReturnType<typeof setTimeout> | undefined

const isControlled = computed(() => props.selectedImages !== undefined)
const selected = computed(() => props.selectedImages ?? internalSelected.value)

watch(
  () => props.images,
  (images) => {
    internalImages.value = images.map(image => ({ ...image }))
    originalImages.value = images.map(image => ({ ...image }))
  },
  { deep: true },
)

onBeforeUnmount(() => {
  if (resetTimer) {
    clearTimeout(resetTimer)
  }
})

function isSelected(id: number) {
  return selected.value.includes(id)
}

function setSelected(next: number[]) {
  if (!isControlled.value) {
    internalSelected.value = next
  }

  emit('update:selectedImages', next)
  emit('change', next)
}

function toggleImage(id: number) {
  if (!isSelecting.value) {
    return
  }

  setSelected(
    isSelected(id)
      ? selected.value.filter(imageId => imageId !== id)
      : [...selected.value, id],
  )
}

function toggleSelecting() {
  const next = !isSelecting.value
  isSelecting.value = next

  if (!next) {
    setSelected([])
  }
}

function reset() {
  if (isResetting.value) {
    return
  }

  isResetting.value = true

  resetTimer = setTimeout(() => {
    internalImages.value = originalImages.value.map(image => ({ ...image }))
    setSelected([])
    isSelecting.value = false
    isResetting.value = false
    resetTimer = undefined
  }, RESET_DELAY)
}

function deleteSelected() {
  if (selected.value.length === 0) {
    return
  }

  const deleted = [...selected.value]
  internalImages.value = internalImages.value.filter(
    image => !deleted.includes(image.id),
  )
  setSelected([])
  emit('delete', deleted)
}

function share() {
  if (selected.value.length === 0) {
    return
  }

  emit('share', [...selected.value])
}
</script>

<template>
  <div
    :class="[
      'relative flex h-full w-full max-w-[500px] flex-col justify-between p-4',
      props.class,
    ]"
  >
    <div
      class="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-default/70 to-transparent"
    />

    <div class="absolute inset-x-5 top-5 z-20 flex justify-between p-4">
      <button
        type="button"
        :aria-label="isResetting ? 'Resetting selection' : 'Reset selection'"
        :class="[
          'cursor-pointer rounded-full px-3 py-1 text-sm font-semibold backdrop-blur-xl transition-[transform,background-color,color] hover:scale-105 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100',
          isResetting
            ? 'selector-wiggle bg-primary text-inverted'
            : 'bg-default/40 text-highlighted',
        ]"
        :disabled="isResetting"
        @click="reset"
      >
        {{ isResetting ? 'Resetting...' : 'Reset' }}
      </button>

      <button
        type="button"
        :aria-label="isSelecting ? 'Cancel selection' : 'Select images'"
        :class="[
          'cursor-pointer rounded-full px-3 py-1 text-sm font-semibold backdrop-blur-xl transition-[transform,background-color,color] hover:scale-105 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100',
          isSelecting
            ? 'selector-wiggle bg-primary text-inverted'
            : 'bg-default/40 text-highlighted',
        ]"
        @click="toggleSelecting"
      >
        {{ isSelecting ? 'Cancel' : 'Select' }}
      </button>
    </div>

    <div :class="['selector-shake', isResetting && 'is-resetting']">
      <TransitionGroup
        class="grid grid-cols-3 gap-1"
        name="selector-item"
        tag="div"
      >
        <button
          v-for="image in internalImages"
          :key="image.id"
          type="button"
          :aria-label="
            isSelected(image.id)
              ? `Deselect gallery item ${image.id}`
              : `Select gallery item ${image.id}`
          "
          :aria-pressed="isSelecting ? isSelected(image.id) : undefined"
          class="selector-item relative aspect-square cursor-pointer disabled:cursor-default"
          :disabled="!isSelecting"
          @click="toggleImage(image.id)"
        >
          <img
            :alt="`Gallery item ${image.id}`"
            :class="[
              'h-full w-full rounded-lg object-cover transition-opacity',
              isSelected(image.id) && isSelecting ? 'opacity-75' : '',
            ]"
            :src="image.src"
            draggable="false"
            height="200"
            loading="lazy"
            width="200"
          >

          <span
            v-if="isSelecting && isSelected(image.id)"
            class="absolute right-2 bottom-2 flex size-6 items-center justify-center rounded-full border border-white bg-primary text-inverted"
          >
            <UIcon
              class="size-3.5"
              name="i-lucide-check"
            />
          </span>
        </button>
      </TransitionGroup>
    </div>

    <Transition name="selector-bar">
      <div
        v-if="isSelecting"
        class="absolute inset-x-0 bottom-0 z-10 mx-auto flex w-2/3 items-center justify-between rounded-full bg-default/40 p-4 backdrop-blur-md"
      >
        <button
          type="button"
          aria-label="Share selected images"
          class="cursor-pointer text-primary transition-transform hover:scale-110 active:scale-95 disabled:cursor-default disabled:opacity-40 motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
          :disabled="selected.length === 0"
          @click="share"
        >
          <UIcon
            class="size-6"
            name="i-lucide-share-2"
          />
        </button>

        <span
          aria-live="polite"
          class="text-sm text-highlighted"
        >{{ selected.length }} selected</span>

        <button
          type="button"
          aria-label="Delete selected images"
          class="cursor-pointer text-primary transition-transform hover:scale-110 active:scale-95 disabled:cursor-default disabled:opacity-40 motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
          :disabled="selected.length === 0"
          @click="deleteSelected"
        >
          <UIcon
            class="size-6"
            name="i-lucide-trash-2"
          />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.selector-wiggle {
  animation: selector-wiggle 300ms ease-in-out;
}

@keyframes selector-wiggle {
  0%,
  100% {
    rotate: 0deg;
    scale: 1;
  }

  30% {
    rotate: -5deg;
    scale: 1.1;
  }

  70% {
    rotate: 5deg;
    scale: 1.05;
  }
}

.selector-shake.is-resetting {
  animation: selector-shake 300ms ease-in-out;
}

@keyframes selector-shake {
  0%,
  100% {
    scale: 1;
  }

  50% {
    scale: 0.95;
  }
}

.selector-item {
  animation: selector-item-in 250ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes selector-item-in {
  from {
    opacity: 0;
    scale: 0.8;
  }

  to {
    opacity: 1;
    scale: 1;
  }
}

.selector-item-leave-active {
  transition:
    opacity 200ms ease,
    scale 200ms ease;
}

.selector-item-leave-to {
  opacity: 0;
  scale: 0.8;
}

.selector-item-move {
  transition: transform 200ms ease;
}

.selector-bar-enter-active,
.selector-bar-leave-active {
  transition:
    opacity 250ms ease,
    transform 250ms ease;
}

.selector-bar-enter-from,
.selector-bar-leave-to {
  opacity: 0;
  translate: 0 20px;
}

@media (prefers-reduced-motion: reduce) {
  .selector-wiggle,
  .selector-shake.is-resetting,
  .selector-item {
    animation: none;
  }

  .selector-item-leave-active,
  .selector-item-move,
  .selector-bar-enter-active,
  .selector-bar-leave-active {
    transition: none;
  }

  .selector-bar-enter-from,
  .selector-bar-leave-to {
    translate: 0 0;
  }
}
</style>
