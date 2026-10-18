<template>
  <div class="flex w-full max-w-sm flex-col items-center gap-5">
    <MTextScramble
      text="ACCESS GRANTED"
      as="h2"
      character-set="01"
      :duration="1.4"
      :speed="0.02"
      :trigger="trigger"
      class="font-mono text-2xl font-bold tracking-widest text-green-500"
      @scramble-complete="done = true"
    />

    <div class="flex items-center gap-3">
      <UButton
        label="Re-run"
        icon="i-lucide-refresh-cw"
        variant="outline"
        @click="replay"
      />
      <UBadge
        :color="done ? 'success' : 'neutral'"
        variant="soft"
      >
        {{ done ? 'Decoded' : 'Decoding' }}
      </UBadge>
    </div>
  </div>
</template>

<script setup lang="ts">
const trigger = ref(true)
const done = ref(false)

function replay() {
  done.value = false
  trigger.value = false
  nextTick(() => {
    trigger.value = true
  })
}
</script>
