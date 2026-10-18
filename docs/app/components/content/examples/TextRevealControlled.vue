<template>
  <div class="flex flex-col items-center gap-4">
    <MTextReveal
      text="Reveal on demand"
      effect="slide"
      :start-on-view="false"
      :trigger="playing"
      :reduce-motion="reduceMotion"
      aria-label="Reveal on demand heading"
      class="cursor-pointer text-2xl font-bold text-default"
      @click="replay"
      @complete="completed = true"
    />

    <div class="flex items-center gap-4">
      <UButton
        label="Replay"
        icon="i-lucide-rotate-ccw"
        variant="outline"
        @click="replay"
      />
      <USwitch
        v-model="reduceMotion"
        label="Reduce motion"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const playing = ref(true)
const reduceMotion = ref(false)
const completed = ref(false)

function replay() {
  playing.value = false
  nextTick(() => {
    playing.value = true
  })
}
</script>
