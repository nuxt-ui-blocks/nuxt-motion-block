<script setup lang="ts">
import { computed, ref } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { DEFAULT_PLATFORMS, type SocialPlatform } from '../utils/social-platforms'

export type { SocialIcon, SocialPlatform } from '../utils/social-platforms'

export interface SocialSelectorProps {
  /** Extra classes for the root wrapper. */
  class?: string
  /** Handle shown under the platform row. */
  handle?: string
  /** Platforms to offer. */
  platforms?: SocialPlatform[]
  /** Controlled selection. Leave it out to let the component keep its own. */
  selectedPlatform?: SocialPlatform
}

const props = withDefaults(defineProps<SocialSelectorProps>(), {
  class: undefined,
  handle: 'nuxt',
  platforms: () => DEFAULT_PLATFORMS,
  selectedPlatform: undefined,
})

const emit = defineEmits<{
  /** Fired when another platform is selected. */
  change: [platform: SocialPlatform]
}>()

const ICON_SIZE = 36
const ICON_GAP = 16

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const internalSelected = ref<SocialPlatform>(props.platforms[0] ?? DEFAULT_PLATFORMS[0]!)
const selected = computed(() => props.selectedPlatform ?? internalSelected.value)
const selectedIndex = computed(() =>
  Math.max(props.platforms.findIndex(platform => platform.name === selected.value.name), 0),
)

function select(platform: SocialPlatform) {
  if (props.selectedPlatform === undefined) {
    internalSelected.value = platform
  }

  emit('change', platform)
}
</script>

<template>
  <div :class="['mx-auto my-4 w-full max-w-2xl text-center', props.class]">
    <div class="space-y-6">
      <div class="flex items-center justify-center">
        <div class="relative flex w-fit items-center justify-center gap-4">
          <button
            v-for="platform in props.platforms"
            :key="platform.name"
            :aria-label="`Select ${platform.name} platform`"
            :aria-pressed="selected.name === platform.name"
            :class="[
              'relative z-10 cursor-pointer rounded-full p-2 transition-colors',
              selected.name === platform.name ? 'text-highlighted' : 'text-muted hover:text-default',
            ]"
            type="button"
            @click="select(platform)"
          >
            <svg
              v-if="platform.icon === 'x'"
              aria-hidden="true"
              class="h-5 w-5 fill-current"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
            <svg
              v-else-if="platform.icon === 'bluesky'"
              aria-hidden="true"
              class="h-5 w-5 fill-current"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M111.8 62.2C170.2 105.9 233 194.7 256 242.4c23-47.6 85.8-136.4 144.2-180.2c42.1-31.6 110.3-56 110.3 21.8c0 15.5-8.9 130.5-14.1 149.2C478.2 298 412 314.6 353.1 304.5c102.9 17.5 129.1 75.5 72.5 133.5c-107.4 110.2-154.3-27.6-166.3-62.9l0 0c-1.7-4.9-2.6-7.8-3.3-7.8s-1.6 3-3.3 7.8l0 0c-12 35.3-59 173.1-166.3 62.9c-56.5-58-30.4-116 72.5-133.5C100 314.6 33.8 298 15.7 233.1C10.4 214.4 1.5 99.4 1.5 83.9c0-77.8 68.2-53.4 110.3-21.8z" />
            </svg>
            <svg
              v-else-if="platform.icon === 'threads'"
              aria-hidden="true"
              class="h-5 w-5 fill-current"
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8c29.2 14.1 50.6 35.2 61.8 61.4c15.7 36.5 17.2 95.8-30.3 143.2c-36.2 36.2-80.3 52.5-142.6 53h-.3c-70.2-.5-124.1-24.1-160.4-70.2c-32.3-41-48.9-98.1-49.5-169.6V256v-.2C17 184.3 33.6 127.2 65.9 86.2C102.2 40.1 156.2 16.5 226.4 16h.3c70.3 .5 124.9 24 162.3 69.9c18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4c-29.2-35.8-73-54.2-130.5-54.6c-57 .5-100.1 18.8-128.2 54.4C72.1 146.1 58.5 194.3 58 256c.5 61.7 14.1 109.9 40.3 143.3c28 35.6 71.2 53.9 128.2 54.4c51.4-.4 85.4-12.6 113.7-40.9c32.3-32.2 31.7-71.8 21.4-95.9c-6.1-14.2-17.1-26-31.9-34.9c-3.7 26.9-11.8 48.3-24.7 64.8c-17.1 21.8-41.4 33.6-72.7 35.3c-23.6 1.3-46.3-4.4-63.9-16c-20.8-13.8-33-34.8-34.3-59.3c-2.5-48.3 35.7-83 95.2-86.4c21.1-1.2 40.9-.3 59.2 2.8c-2.4-14.8-7.3-26.6-14.6-35.2c-10-11.7-25.6-17.7-46.2-17.8H227c-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1h.8c62.6 .4 99.9 39.5 103.7 107.7l-.2 .2zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3c25.6-1.4 54.6-11.4 59.5-73.2c-13.2-2.9-27.8-4.4-43.4-4.4c-4.8 0-9.6 .1-14.4 .4c-42.9 2.4-57.2 23.2-56.2 41.8l-.1 .1z" />
            </svg>
            <UIcon
              v-else
              aria-hidden="true"
              class="size-5"
              name="i-lucide-globe"
            />
          </button>

          <motion.div
            aria-hidden="true"
            class="absolute top-0 left-0 z-0 h-9 w-9 rounded-full border border-default bg-default"
            :animate="isReduced ? {} : { x: selectedIndex * (ICON_SIZE + ICON_GAP) }"
            :initial="false"
            :transition="isReduced ? { duration: 0 } : { damping: 30, stiffness: 500, type: 'spring' }"
          />
        </div>
      </div>

      <p class="text-md text-muted">
        Updates on
        <span class="font-medium text-highlighted">
          <AnimatePresence mode="wait">
            <motion.a
              :key="selected.domain"
              :animate="isReduced ? { opacity: 1 } : { filter: 'blur(0px)', opacity: 1, y: 0 }"
              :exit="isReduced ? { opacity: 0 } : { filter: 'blur(5px)', opacity: 0, y: -10 }"
              :href="selected.url"
              :initial="isReduced ? { opacity: 1 } : { filter: 'blur(5px)', opacity: 0, y: 10 }"
              rel="noopener noreferrer"
              target="_blank"
              :transition="isReduced ? { duration: 0 } : { duration: 0.25 }"
            >
              {{ selected.domain }}
            </motion.a>
          </AnimatePresence>
        </span>
        <br>
        <a
          class="font-medium text-highlighted"
          :href="selected.url"
          rel="noopener noreferrer"
          target="_blank"
        >
          @{{ props.handle }}
        </a>
      </p>
    </div>
  </div>
</template>
