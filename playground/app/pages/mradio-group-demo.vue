<script setup lang="ts">
const options = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
]

const plans = [
  { value: 'starter', label: 'Starter', description: 'Up to 3 projects and 1 GB of storage.' },
  { value: 'team', label: 'Team', description: 'Endless projects, 50 GB of storage, shared boards.' },
  { value: 'legacy', label: 'Legacy', description: 'Kept for accounts created before 2024.', disabled: true },
]
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="RadioGroup"
      description="Radio group with a staggered entrance, a hover scale on the indicator and a spring pop on the selection dot."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Default
        </p>
        <p class="text-muted">
          Pick an option to see the dot spring in.
        </p>
      </template>
      <MRadioGroup
        :items="options"
        :default-value="'option-1'"
      />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Descriptions and disabled items
        </p>
        <p class="text-muted">
          Each item rises into place 40ms after the previous one.
        </p>
      </template>
      <MRadioGroup
        :items="plans"
        legend="Pick a plan"
        default-value="team"
      />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Horizontal
        </p>
        <p class="text-muted">
          Arrow key navigation follows the orientation.
        </p>
      </template>
      <MRadioGroup
        :items="options"
        orientation="horizontal"
      />
    </UCard>
  </div>
</template>
