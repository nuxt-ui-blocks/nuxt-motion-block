<template>
  <div class="flex w-full max-w-xl flex-col gap-3">
    <MJobListing
      :jobs="jobs"
      @select="status = `Opened ${$event.company}`"
    >
      <template #logo="{ job }">
        <span
          aria-hidden="true"
          :class="[
            'flex size-10 shrink-0 items-center justify-center rounded-lg text-inverted',
            job.tone,
          ]"
        >
          <UIcon
            class="size-5"
            :name="job.icon"
          />
        </span>
      </template>
    </MJobListing>

    <p class="px-2 text-sm text-muted">
      {{ status }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const status = ref('Pick a role to read the full listing.')

const jobs = [
  {
    company: 'Atlas',
    title: 'Design engineer',
    salary: '$130k – $160k',
    location: 'Remote (EU)',
    remote: 'Yes' as const,
    postedAt: '1d ago',
    description:
      'Sit between design and engineering on a small product team. Half your week is prototypes in Vue, the other half is refinement and code review. We expect taste, patience and a strong opinion about focus rings.',
    icon: 'i-lucide-compass',
    tone: 'bg-primary',
  },
  {
    company: 'Field Notes',
    title: 'Editorial lead',
    salary: '$110k – $135k',
    location: 'London',
    remote: 'Hybrid' as const,
    postedAt: '4d ago',
    description:
      'Run a small editorial team covering tools, craft and the people who make software. You will commission, edit and occasionally write, and you will protect the time it takes to make a piece actually good.',
    icon: 'i-lucide-notebook-pen',
    tone: 'bg-gradient-to-br from-warning to-error',
  },
  {
    company: 'Quarry',
    title: 'Platform engineer',
    salary: '$150k – $185k',
    location: 'Toronto',
    remote: 'No' as const,
    postedAt: '2w ago',
    description:
      'Keep the build fast and the deployments boring. The platform is TypeScript, Postgres and a growing set of internal tools. You will measure before optimizing, write the runbook, and delete more code than you add.',
    icon: 'i-lucide-layers',
    tone: 'bg-inverted',
  },
]
</script>
