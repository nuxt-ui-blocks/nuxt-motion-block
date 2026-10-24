<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useTemplateRef } from 'vue'

export interface ImageMetadata {
  /** Author credited for the image. */
  by: string
  /** Human-readable creation date. */
  created: string
  /** Where the file came from. */
  source: string
  /** Human-readable last-modified date. */
  updated: string
}

export interface ImageMetadataPreviewProps {
  /** Alt text for the image. */
  alt?: string
  /** Extra classes for the anchored root. */
  class?: string
  /** One-line description shown under the filename. */
  description?: string
  /** Filename shown at the top of the panel. */
  filename?: string
  /** Image to preview. */
  imageSrc: string
  /** Fields listed in the panel table. */
  metadata: ImageMetadata
  /** Called when Share is pressed. The button is disabled while it is missing. */
  onShare?: () => void
}

const props = withDefaults(defineProps<ImageMetadataPreviewProps>(), {
  alt: 'Image preview',
  class: undefined,
  description: 'No description',
  filename: 'screenshot.png',
  onShare: undefined,
})

const open = ref(false)
const panel = useTemplateRef<HTMLElement>('panel')
const panelHeight = ref(0)
const openButton = useTemplateRef<{ $el: HTMLButtonElement }>('openButton')
const closeButton = useTemplateRef<{ $el: HTMLButtonElement }>('closeButton')

let observer: ResizeObserver | undefined

function measure() {
  panelHeight.value = panel.value?.offsetHeight ?? 0
}

function observePanel() {
  observer?.disconnect()

  if (!panel.value || typeof ResizeObserver === 'undefined') {
    return
  }

  observer = new ResizeObserver(measure)
  observer.observe(panel.value)
  measure()
}

async function openPanel() {
  open.value = true
  await nextTick()
  observePanel()
  closeButton.value?.$el.focus()
}

async function closePanel() {
  open.value = false
  observer?.disconnect()
  observer = undefined
  panelHeight.value = 0
  await nextTick()
  openButton.value?.$el.focus()
}

onBeforeUnmount(() => observer?.disconnect())

const imageStyle = computed(() => ({ transform: `translateY(-${panelHeight.value}px)` }))
</script>

<template>
  <div :class="['absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-4', props.class]">
    <div
      class="pointer-events-none overflow-hidden rounded-xl transition-transform duration-[250ms] ease-out motion-reduce:transition-none"
      :style="imageStyle"
    >
      <img
        :alt="props.alt"
        :height="437"
        :src="props.imageSrc"
        :width="300"
        class="h-[437px] w-[300px] select-none object-cover"
        draggable="false"
      >
    </div>

    <div class="relative flex w-full flex-col items-center gap-4">
      <div class="relative flex w-full flex-row items-center justify-center gap-4">
        <UButton
          aria-label="Share"
          color="neutral"
          icon="i-lucide-share"
          size="lg"
          square
          class="size-11 rounded-full"
          :disabled="!props.onShare"
          variant="outline"
          @click="props.onShare?.()"
        />

        <UButton
          class="h-11 rounded-full px-5"
          color="neutral"
          disabled
          label="Connect"
          size="md"
          variant="outline"
        />

        <Transition name="metadata-toggle">
          <UButton
            v-if="!open"
            ref="openButton"
            aria-label="Open metadata preview"
            color="neutral"
            icon="i-lucide-chevron-up"
            size="lg"
            square
            class="rounded-full"
            variant="outline"
            @click="openPanel"
          />
        </Transition>
      </div>

      <Transition name="metadata-panel">
        <div
          v-if="open"
          ref="panel"
          aria-label="Image metadata"
          class="absolute bottom-0 w-full cursor-pointer rounded-[20px] border border-default bg-default p-5 shadow-sm"
          role="group"
          @click="closePanel"
          @keydown.esc="closePanel"
        >
          <div class="flex w-full flex-row items-start justify-between gap-4">
            <div class="min-w-0">
              <p class="truncate text-sm font-medium text-highlighted">
                {{ props.filename }}
              </p>
              <p class="truncate text-sm text-muted">
                {{ props.description }}
              </p>
            </div>

            <UButton
              ref="closeButton"
              aria-label="Close metadata preview"
              color="neutral"
              icon="i-lucide-circle-x"
              size="xs"
              square
              class="shrink-0 rounded-full"
              variant="ghost"
              @click.stop="closePanel"
            />
          </div>

          <table class="mt-4 w-full text-sm">
            <caption class="sr-only">
              Image metadata
            </caption>
            <tbody>
              <tr>
                <th
                  class="w-1/2 py-1 text-left font-normal text-muted"
                  scope="row"
                >
                  Created
                </th>
                <td class="py-1 text-highlighted">
                  {{ props.metadata.created }}
                </td>
              </tr>
              <tr>
                <th
                  class="w-1/2 py-1 text-left font-normal text-muted"
                  scope="row"
                >
                  Updated
                </th>
                <td class="py-1 text-highlighted">
                  {{ props.metadata.updated }}
                </td>
              </tr>
              <tr>
                <th
                  class="w-1/2 py-1 text-left font-normal text-muted"
                  scope="row"
                >
                  By
                </th>
                <td class="py-1 text-highlighted">
                  {{ props.metadata.by }}
                </td>
              </tr>
              <tr>
                <th
                  class="w-1/2 py-1 text-left font-normal text-muted"
                  scope="row"
                >
                  Source
                </th>
                <td class="max-w-0 truncate py-1 text-highlighted">
                  {{ props.metadata.source }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.metadata-toggle-enter-active,
.metadata-toggle-leave-active {
  transition:
    opacity 200ms ease,
    filter 200ms ease;
}

.metadata-toggle-enter-from,
.metadata-toggle-leave-to {
  opacity: 0;
  filter: blur(4px);
}

.metadata-panel-enter-active,
.metadata-panel-leave-active {
  transition:
    opacity 250ms ease,
    filter 250ms ease,
    transform 250ms ease;
}

.metadata-panel-enter-from,
.metadata-panel-leave-to {
  opacity: 0;
  filter: blur(4px);
  transform: translateY(6px);
}

@media (prefers-reduced-motion: reduce) {
  .metadata-toggle-enter-active,
  .metadata-toggle-leave-active,
  .metadata-panel-enter-active,
  .metadata-panel-leave-active {
    transition: none;
  }
}
</style>
