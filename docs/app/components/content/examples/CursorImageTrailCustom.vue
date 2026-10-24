<template>
  <div class="w-full">
    <MCursorImageTrail
      :distance="48"
      :image-size="64"
      :images="images"
      :lifetime="520"
      :pool-size="8"
      :rotate="26"
      :velocity-scale="0.9"
      class="rounded-2xl border border-default bg-inverted"
      :ui="{ image: 'rounded-full ring-2 ring-primary/60' }"
    >
      <div class="flex min-h-[320px] items-center justify-center p-10">
        <p class="max-w-xs text-center text-sm text-inverted/60">
          Smaller frames, a shorter distance and a stronger speed response make
          the trail feel faster and denser.
        </p>
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
