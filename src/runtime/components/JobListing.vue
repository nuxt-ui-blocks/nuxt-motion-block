<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, useTemplateRef, watch } from 'vue'

export interface JobListingItem {
  /** Company name shown on the card and in the detail panel. */
  company: string
  /** Role title. */
  title: string
  /** Salary range as display text. */
  salary: string
  /** City or region. */
  location: string
  /** Remote policy: `Yes`, `No` or `Hybrid`. */
  remote: 'Yes' | 'No' | 'Hybrid'
  /** Posting age, for example `2d ago`. */
  postedAt: string
  /** Long description revealed in the detail panel. */
  description: string
  /** Optional icon name used by custom logo slots. */
  icon?: string
  /** Optional classes used by custom logo slots. */
  tone?: string
}

export interface JobListingProps {
  /** Extra classes for the root. */
  class?: string
  /** Roles shown in the list. */
  jobs: JobListingItem[]
}

const props = withDefaults(defineProps<JobListingProps>(), {
  class: undefined,
})

const emit = defineEmits<{
  select: [job: JobListingItem]
}>()

const titleId = useId()
const panel = useTemplateRef<HTMLElement>('panel')

const activeJob = ref<JobListingItem | null>(null)
let lastTrigger: HTMLElement | null = null

const isOpen = computed(() => activeJob.value !== null)

function initials(company: string) {
  return company
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('')
}

function remoteLabel(remote: JobListingItem['remote']) {
  if (remote === 'Yes') {
    return 'Remote'
  }

  if (remote === 'No') {
    return 'On-site'
  }

  return 'Hybrid'
}

function openJob(job: JobListingItem, event: MouseEvent) {
  lastTrigger = event.currentTarget as HTMLElement
  activeJob.value = job
  emit('select', job)
}

function close() {
  activeJob.value = null
  nextTick(() => lastTrigger?.focus())
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close()
  }
}

watch(activeJob, (job) => {
  if (job) {
    window.addEventListener('keydown', onKeydown)
    nextTick(() => panel.value?.focus())
  }
  else {
    window.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div :class="['relative flex items-start p-6', props.class]">
    <div
      class="flex w-full flex-col items-center gap-4 px-2"
      :inert="isOpen"
    >
      <button
        v-for="job in props.jobs"
        :key="job.company"
        type="button"
        aria-haspopup="dialog"
        :aria-expanded="activeJob?.company === job.company ? 'true' : 'false'"
        class="group relative flex w-full cursor-pointer flex-row items-center gap-4 overflow-hidden rounded-lg border border-default bg-default p-2 text-left shadow-xs transition-[transform,background-color] hover:bg-elevated/60 active:scale-[0.98] motion-reduce:active:scale-100 md:p-4"
        @click="openJob(job, $event)"
      >
        <slot
          name="logo"
          :job="job"
        >
          <span
            aria-hidden="true"
            class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-elevated text-sm font-semibold text-highlighted"
          >
            {{ initials(job.company) }}
          </span>
        </slot>

        <span class="flex w-full flex-col items-start justify-between gap-0.5">
          <span class="font-medium text-highlighted">{{ job.company }}</span>
          <span class="text-xs text-muted">{{ job.title }} / {{ job.salary }}</span>
          <span class="flex min-w-0 flex-row flex-wrap gap-2 text-xs text-muted">
            {{ remoteLabel(job.remote) }} · {{ job.location }} · {{ job.postedAt }}
          </span>
        </span>
      </button>
    </div>

    <Transition name="job-backdrop">
      <div
        v-if="activeJob"
        class="absolute inset-0 z-20 grid place-items-center bg-inverted/10 backdrop-blur-xl"
        @click.self="close"
      >
        <div
          ref="panel"
          :aria-labelledby="titleId"
          aria-modal="true"
          class="job-panel flex h-fit max-h-[85%] w-[90%] max-w-2xl cursor-default flex-col items-start gap-4 overflow-y-auto rounded-xl border border-default bg-default p-4 shadow-lg outline-none"
          role="dialog"
          tabindex="-1"
        >
          <div class="flex w-full items-center gap-4">
            <slot
              name="logo"
              :job="activeJob"
            >
              <span
                aria-hidden="true"
                class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-elevated text-sm font-semibold text-highlighted"
              >
                {{ initials(activeJob.company) }}
              </span>
            </slot>

            <div class="flex min-w-0 grow flex-col gap-0.5">
              <p
                :id="titleId"
                class="font-medium text-highlighted"
              >
                {{ activeJob.company }}
              </p>
              <p class="text-sm text-muted">
                {{ activeJob.title }} / {{ activeJob.salary }}
              </p>
              <p class="flex flex-wrap gap-2 text-xs text-muted">
                {{ remoteLabel(activeJob.remote) }} · {{ activeJob.location }} ·
                {{ activeJob.postedAt }}
              </p>
            </div>
          </div>

          <p class="text-sm text-muted">
            {{ activeJob.description }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.job-panel {
  transition: transform 250ms cubic-bezier(0.645, 0.045, 0.355, 1);
}

.job-backdrop-enter-active,
.job-backdrop-leave-active {
  transition: opacity 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
}

.job-backdrop-enter-from,
.job-backdrop-leave-to {
  opacity: 0;
}

.job-backdrop-enter-from .job-panel,
.job-backdrop-leave-to .job-panel {
  transform: scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .job-panel,
  .job-backdrop-enter-active,
  .job-backdrop-leave-active {
    transition: none;
  }

  .job-backdrop-enter-from .job-panel,
  .job-backdrop-leave-to .job-panel {
    transform: none;
  }
}
</style>
