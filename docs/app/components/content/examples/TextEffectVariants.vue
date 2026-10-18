<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MTextEffect
      :key="run"
      :children="copy"
      per="char"
      as="span"
      class="text-3xl font-black uppercase tracking-tight text-primary"
      :variants="{
        container: {
          hidden: { opacity: 1 },
          visible: { opacity: 1, transition: { staggerChildren: 0.025 } },
        },
        item: {
          hidden: { opacity: 0, y: '0.5em' },
          visible: { opacity: 1, y: 0 },
        },
      }"
      :container-transition="{ duration: 0.3 }"
      :segment-transition="{ type: 'spring', stiffness: 420, damping: 24 }"
      segment-wrapper-class-name="overflow-visible"
    />

    <UButton
      label="Replay"
      icon="i-lucide-rotate-ccw"
      variant="outline"
      class="self-center"
      @click="run++"
    />
  </div>
</template>

<script setup lang="ts">
const run = ref(0)
const copy = 'Custom variants'
</script>
