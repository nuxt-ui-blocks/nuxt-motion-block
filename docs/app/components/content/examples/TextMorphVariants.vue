<template>
  <div class="flex flex-col items-center gap-4">
    <MTextMorph
      :text="status"
      as="span"
      class="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
      class-name="tracking-widest"
      :style="{ letterSpacing: '0.12em' }"
      :variants="{
        initial: { opacity: 0, y: 8, filter: 'blur(6px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, y: -8, filter: 'blur(6px)' },
      }"
      :transition="{ type: 'spring', stiffness: 420, damping: 30 }"
    />

    <UButton
      label="Next status"
      variant="outline"
      @click="index = (index + 1) % statuses.length"
    />
  </div>
</template>

<script setup lang="ts">
const statuses = ['Syncing', 'Building', 'Deploying', 'Live']
const index = ref(0)
const status = computed(() => statuses[index.value])
</script>
