<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div class="flex flex-wrap items-center justify-center gap-5 rounded-2xl border border-default p-6">
      <MAgentAvatar
        v-for="seed in seeds"
        :key="seed"
        :animated="animated"
        :seed="seed"
        :size="size"
      />
    </div>

    <div class="flex items-center gap-4">
      <USwitch
        v-model="animated"
        class="shrink-0"
        label="animated"
      />
      <USlider
        v-model="size"
        class="flex-1"
        :max="112"
        :min="40"
      />
    </div>

    <p class="text-xs text-muted">
      {{ size }}px — four seeds, four permanently distinct avatars.
    </p>
  </div>
</template>

<script setup lang="ts">
const seeds = ['atlas', 'ember', 'kestrel', 'nimbus']
const animated = ref(true)
const size = ref(72)
</script>
