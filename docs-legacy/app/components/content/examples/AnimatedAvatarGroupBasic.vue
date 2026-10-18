<template>
  <div class="flex w-full max-w-md flex-col gap-5">
    <div class="flex items-center justify-between rounded-2xl border border-default bg-default p-5">
      <MAnimatedAvatarGroup
        :avatars="avatars"
        :max="max"
        :size="size"
        :overlap="overlap"
        :hover-scale="1.08"
      />
      <span class="text-xs text-muted">{{ avatars.length }} people</span>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <USelect
        v-model="size"
        :items="['sm', 'md', 'lg', 'xl', '2xl']"
      />
      <USelect
        v-model="max"
        :items="maxItems"
      />
    </div>

    <USlider
      v-model="overlap"
      :min="0"
      :max="0.6"
      :step="0.05"
      label="Overlap"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
const size = ref<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg')
const max = ref(4)
const overlap = ref(0.35)

const avatars = [
  { src: 'https://randomuser.me/api/portraits/women/44.jpg', alt: 'Ana Ruiz' },
  { src: 'https://randomuser.me/api/portraits/men/32.jpg', alt: 'Ben Osei' },
  { src: 'https://randomuser.me/api/portraits/women/68.jpg', alt: 'Cleo Park' },
  { src: 'https://randomuser.me/api/portraits/men/75.jpg', alt: 'Dmitri Ilves' },
  { src: 'https://randomuser.me/api/portraits/women/90.jpg', alt: 'Elin Haugen' },
  { src: 'https://randomuser.me/api/portraits/men/11.jpg', alt: 'Farid Nazari' },
]

const maxItems = [
  { label: 'Show 3', value: 3 },
  { label: 'Show 4', value: 4 },
  { label: 'Show all', value: 6 },
]
</script>
