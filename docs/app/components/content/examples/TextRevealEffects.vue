<template>
  <div class="grid w-full max-w-lg gap-4">
    <p
      v-for="test in tests"
      :key="test.label"
      class="flex items-baseline gap-3"
    >
      <span class="w-24 shrink-0 text-xs uppercase tracking-widest text-muted">
        {{ test.label }}
      </span>
      <MTextReveal
        :text="test.text"
        :effect="test.effect"
        :direction="test.direction"
        :stagger="0.04"
        char-class="text-primary"
        class="text-xl font-semibold"
      />
    </p>
  </div>
</template>

<script setup lang="ts">
const tests = [
  { label: 'Slide up', text: 'Slide from below', effect: 'slide' as const, direction: 'up' as const },
  { label: 'Rotate left', text: 'Rotate in place', effect: 'rotate' as const, direction: 'left' as const },
  { label: 'Bounce down', text: 'Bounce into view', effect: 'bounce' as const, direction: 'down' as const },
  { label: 'Scale', text: 'Grow into focus', effect: 'scale' as const, direction: 'up' as const },
  { label: 'Blur', text: 'Resolve from blur', effect: 'blur' as const, direction: 'up' as const },
]
</script>
