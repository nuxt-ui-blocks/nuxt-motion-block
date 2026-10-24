<template>
  <div class="w-full">
    <MCursorImageTrail
      :images="images"
      class="rounded-2xl border border-default bg-elevated/40"
    >
      <div class="flex min-h-[320px] items-center justify-center p-10">
        <div class="max-w-sm text-center">
          <UIcon
            class="mx-auto size-8 text-primary"
            name="i-lucide-mouse-pointer-2"
          />
          <p class="mt-4 text-lg font-medium text-highlighted">
            Move the pointer across this panel
          </p>
          <p class="mt-2 text-sm text-muted">
            A new portrait drops into the trail every 90 pixels of travel.
          </p>
        </div>
      </div>
    </MCursorImageTrail>
  </div>
</template>

<script setup lang="ts">
const images = [
  { src: 'https://randomuser.me/api/portraits/women/44.jpg', alt: 'Ana Ruiz' },
  { src: 'https://randomuser.me/api/portraits/men/32.jpg', alt: 'Ben Osei' },
  { src: 'https://randomuser.me/api/portraits/women/68.jpg', alt: 'Cleo Park' },
  { src: 'https://randomuser.me/api/portraits/men/75.jpg', alt: 'Dmitri Ilves' },
  { src: 'https://randomuser.me/api/portraits/women/90.jpg', alt: 'Elin Haugen' },
  { src: 'https://randomuser.me/api/portraits/men/11.jpg', alt: 'Farid Nazari' },
]
</script>
